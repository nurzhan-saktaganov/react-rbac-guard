import RequirementPredicate from "./RequirementPredicate";

class RequirementAny extends RequirementPredicate {
  isSatisfied(credentials: any) {
    return this.requirements.some((r: any) => r.isSatisfied(credentials));
  }
}

export default RequirementAny;
