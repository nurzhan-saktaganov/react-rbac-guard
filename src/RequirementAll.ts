import RequirementPredicate from "./RequirementPredicate";

class RequirementAll extends RequirementPredicate {
  isSatisfied(credentials: any) {
    return this.requirements.every((r: any) => r.isSatisfied(credentials));
  }
}

export default RequirementAll;
