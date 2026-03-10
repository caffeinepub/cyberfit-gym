import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
}
export interface MembershipRequest {
    id: bigint;
    plan: MembershipPlan;
    fullName: string;
    email: string;
    phone: string;
}
export enum MembershipPlan {
    Premium = "Premium",
    Regular = "Regular"
}
export interface backendInterface {
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllMembershipSubmissions(): Promise<Array<MembershipRequest>>;
    getMemberCount(): Promise<bigint>;
    getMembershipSubmissionCount(): Promise<bigint>;
    incrementMemberCount(): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<bigint>;
    submitMembership(fullName: string, phone: string, email: string, plan: MembershipPlan): Promise<bigint>;
}
