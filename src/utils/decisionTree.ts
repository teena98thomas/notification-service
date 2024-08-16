import { Status, Urgency } from "../types";

interface DecisionTreeInput {
    urgency: Urgency;
    activity: Status;
  }
  
  export function getNotificationTime({ urgency, activity }: DecisionTreeInput): number {
    if(activity === Status.ACTIVE) {
        return 0;
    } else{
        switch (urgency) {
            case Urgency.HIGH:
                return   30 * 1000; // 30 minutes
            case Urgency.MEDIUM:
                return  60 * 1000; // 1 hour
            case Urgency.LOW:
                return 2 * 60 * 1000; // 2 hours
            default:
                return 0;
        }
    }
    
  }