const baseUrl = "http://localhost:5000/";

export const urlConstants = {
  getProblem: baseUrl + "api/problems/id",
  getProblems: baseUrl + "api/problems",
  getCompetition: baseUrl + "api/competitions/id",
  getCompetitions: baseUrl + "api/competitions",
  createCompetition: baseUrl + "api/competitions/create",
  updateCompetition: baseUrl + "api/competitions/update",
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
  problem: baseUrl + "api/problems",
  user: baseUrl + "api/users",
  createProblem: baseUrl + "api/problems/create",
  updateProblem: baseUrl + "api/problems/update",
  adminProblemId: baseUrl + "api/problems/admin",
  adminUserId: baseUrl + "api/users/admin",
};

export const adminRoutes = {
  getProblems: baseUrl + "api/problems/admin",
};
