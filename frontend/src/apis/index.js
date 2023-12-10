const baseUrl = "http://localhost:5000/";

export const urlConstants = {
  getProblem: baseUrl + "api/problems/id",
  getProblems: baseUrl + "api/problems",
  getCompetition: baseUrl + "api/competition/id",
  getCompetitions: baseUrl + "api/competition",
  registerForCompetiton: baseUrl + "api/competition/registeruser",
  runCode: baseUrl + "api/code/run",
  submitCode: baseUrl + "api/code/submit",
  loginUser: baseUrl + "api/auth/login",
  registerUser: baseUrl + "api/auth/register",
  getSocialProfile: baseUrl + "api/social-profile/id",
  updateSocialProfile: baseUrl + "api/social-profile/update",
  updateAvatarUrl: baseUrl + "api/images/update",
  updateUserProfile: baseUrl + "api/users/update",
  getUsers: baseUrl + "api/users",
  singleUser: baseUrl + "api/users",
  createUser: baseUrl + "api/users/create",
};
