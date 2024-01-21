
import {
  FORM_FIELD_EMP_CODE,
  FORM_FIELD_PASSWORD,
} from "../constants/field";
import { toObject } from "../helpers/utils";
export const fields = [
  FORM_FIELD_EMP_CODE,
  FORM_FIELD_PASSWORD,
];
export const formFields = toObject(fields);
export const initialFormState = {
  ...formFields,
  hasError: false,
};
export const touchFieldsObject = toObject(fields, false);

function createPolicyData(policy, name) {
  return { policy, name };
}

function createProposalData(proposal, name, status) {
  return { proposal, name, status };
}

export const proposalRows = {
  0: [
    createProposalData("PR0003", "-", "e-KYC"),
    createProposalData("PR0005", "Amit Kumar", "Nominee"),
  ],
  1: [
    createProposalData("PR0001", "Ansh Katiyar", "Payment"),
    createProposalData("PR0003", "-", "e-KYC"),
    createProposalData("PR0005", "Amit Kumar", "Nominee"),
  ],
  2: [
    createProposalData("PR0001", "Ansh Katiyar", "Payment"),
    createProposalData("PR0002", "Palak Gupta", "Payment"),
    createProposalData("PR0003", "-", "e-KYC"),
    createProposalData("PR0004", "Man Singla", "Nominee"),
    createProposalData("PR0005", "Amit Kumar", "Nominee"),
  ],
};

export const policyRows = {
  0: [createPolicyData("POLICY001", "Mohan Singh")],
  1: [
    createPolicyData("POLICY001", "Mohan Singh"),
    createPolicyData("POLICY002", "Aman Gupta"),
    createPolicyData("POLICY003", "Naman Kumar"),
  ],
  2: [
    createPolicyData("POLICY001", "Mohan Singh"),
    createPolicyData("POLICY002", "Aman Gupta"),
    createPolicyData("POLICY003", "Naman Kumar"),
    createPolicyData("POLICY004", "Amit Singh"),
    createPolicyData("POLICY005", "Mac Mohan"),
  ],
};