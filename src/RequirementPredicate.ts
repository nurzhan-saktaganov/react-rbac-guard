import Requirement from "./Requirement";

class RequirementPredicate extends Requirement {

  constructor(...requirements: any) {
    super();
    if (new.target === RequirementPredicate) {
      throw new TypeError(
        "Cannot construct RequirementPredicate instances directly"
      );
    }

    if (requirements.length === 0) {
      throw new Error("No requirement has been provided");
    }

    if (requirements.some((r: any) => !(r instanceof Requirement))) {
      throw new Error(
        "requirements are expected to be instances of 'Requirement'"
      );
    }

    this.requirements = requirements;
  }
}

export default RequirementPredicate;
