from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.services.executive_ai import generate_executive_summary
from app.database import init_db
from app.services.event_repository import save_event
from app.services.risk_advisor import generate_risk_advice
from app.services.fake_events import generate_fake_event
from app.services.prediction_engine import generate_prediction
from app.services.metrics import get_metrics
from app.services.threat_hunter import generate_threat_analysis
from app.services.incidents import generate_incidents
from app.services.correlation_engine import generate_correlation
import asyncio
from datetime import datetime
from app.services.chat_ai import ask_sentinel
from pydantic import BaseModel
from app.services.timeline_engine import generate_timeline
from app.services.incident_repository import create_incident
from app.services.incident_repository import update_incident_status
app = FastAPI()

class ChatRequest(BaseModel):

    question: str

init_db()

from app.services.response_engine import generate_response_actions

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "Sentinel SOC Backend Online"}

@app.get("/incidents")
async def get_incidents():

    return generate_incidents()

@app.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):

    await websocket.accept()

    while True:

        event = generate_fake_event()

        timestamp = datetime.now().strftime("%H:%M:%S")

        event["timestamp"] = timestamp

        save_event(event)

        if event["severity"] in ["CRITICAL", "HIGH"]:
            create_incident(event)

        log = (
            f"{timestamp} "
            f"[{event['severity']}] "
            f"{event['message']} | "
            f"MITRE:{event['mitre']} | "
            f"IP:{event['source_ip']} | "
            f"Agent:{event['agent']} | "
            f"Confidence:{event['confidence']}%"
        )

        await websocket.send_text(log)

        await asyncio.sleep(1.5)
@app.get("/metrics")
async def metrics():

    return get_metrics()

@app.get("/correlations")
async def correlations():

    return generate_correlation()

@app.get("/timeline")
async def timeline():

    return generate_timeline()

@app.get("/responses")
async def responses():

    return generate_response_actions()

from app.services.incident_repository import get_all_incidents

@app.get("/incidents-db")
async def incidents_db():
    return get_all_incidents()

@app.post("/incident/{incident_code}/status")
async def update_status(
    incident_code: str,
    status: str
):

    update_incident_status(
        incident_code,
        status
    )

    return {
        "success": True,
        "incident": incident_code,
        "status": status
    }

@app.get("/threat-analysis")
async def threat_analysis():

    return generate_threat_analysis()


@app.get("/prediction")
async def prediction():

    return generate_prediction()

@app.get("/risk-advisor")
async def risk_advisor():

    return generate_risk_advice()


@app.get("/executive-summary")
async def executive_summary():

    return {
        "summary": generate_executive_summary()
    }

@app.post("/chat")
async def chat(request: ChatRequest):

    return {
        "response": ask_sentinel(
            request.question
        )
    }