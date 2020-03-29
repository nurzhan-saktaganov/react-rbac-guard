import Requirement from "./Requirement";
import RequirementAll from "./RequirementAll";
import RequirementAny from "./RequirementAny";
import RequirementNot from "./RequirementNot";
import Guard from "./Guard";
import CredentialProvider from "./CredentialProvider";
import guardFactory from "./guardFactory";
import protect from "./protect";

function all(...requirements: any[]) {
  return new RequirementAll(...requirements);
}

function any(...requirements: any[]) {
  return new RequirementAny(...requirements);
}

function not(requirement: any[]) {
  return new RequirementNot(requirement);
}

export {
  Requirement,
  all,
  any,
  not,
  CredentialProvider,
  Guard,
  guardFactory,
  protect
};
