abstract class Requirement {

  abstract isSatisfied(credentials: any): boolean;
}

export default Requirement;
