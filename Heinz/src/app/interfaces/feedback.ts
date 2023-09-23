import { Timestamp } from "rxjs"

export interface Feedback {
    usuario: string,
    tipo_feedback: string,
    feedback: string,
    rating: string,
    canal: string,
    data_feedback: Date,
}