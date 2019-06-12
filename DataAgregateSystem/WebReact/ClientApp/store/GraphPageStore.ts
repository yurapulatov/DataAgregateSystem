import {Reducer} from 'redux';
import {TrafficData} from "../models/TrafficData";
import {addTask, fetch} from "domain-task";
import {AppThunkAction} from "./index";
import * as moment from "moment";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GraphPageState {
    data: TrafficData[];
    chooseDate: Date | null;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface LoadDataTrafficAction { type: 'GraphPage__LoadDataTraffic', newData: TrafficData[] }
interface SetDateAction { type: 'GraphPage__SetDate', newDate: Date }
interface BugAction { type: 'GraphPage__BUG'}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = LoadDataTrafficAction | SetDateAction | BugAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    loadTrafficData:  (date: Date): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/SampleData/LoadTraffic?date=${ moment(date).format("DD/MM/YYYY") }`)
            .then(response => response.json() as Promise<TrafficData[]>)
            .then(data => {
                dispatch({ type: 'GraphPage__LoadDataTraffic', newData: data });
            });
        addTask(fetchTask);
        dispatch({ type: 'GraphPage__SetDate', newDate: date});
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<GraphPageState> = (state: GraphPageState, action: KnownAction) => {
    const stateNew: GraphPageState = {
        chooseDate: state ? state.chooseDate : null,
        data : state ? state.data : []
    };
    switch (action.type) {
        case 'GraphPage__LoadDataTraffic':
            stateNew.data = action.newData;
            break;
        case 'GraphPage__SetDate':
            stateNew.chooseDate = action.newDate;
            break;
        case 'GraphPage__BUG':
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return stateNew;
};
