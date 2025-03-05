const baseUrl = "https://online-judge-001.onrender.com/";

export const urlConstants = {
  getProblem: baseUrl + "api/problems/id",
  getProblems: baseUrl + "api/problems",
  getCompetition: baseUrl + "api/competitions/id",
  getCompetitions: baseUrl + "api/competitions",
  createCompetition: baseUrl + "api/competitions/create",
  updateCompetition: baseUrl + "api/competitions/update",
  registerForCompetiton: baseUrl + "api/competitions/registeruser",
  runCode: baseUrl + "api/code/run",
  submitCode: baseUrl + "api/code/submit",
  loginUser: baseUrl + "api/auth/login",
  registerUser: baseUrl + "api/auth/register",
  getSocialProfile: baseUrl + "api/social-profile/id",
  updateSocialProfile: baseUrl + "api/social-profile/update",
  updateAvatarUrl: baseUrl + "api/images/update",
  uploadAvatarUrl: baseUrl + "api/images/upload",
  updateUserProfile: baseUrl + "api/users/update",
  getUsers: baseUrl + "api/users",
  singleUser: baseUrl + "api/users",
  createUser: baseUrl + "api/users/create",
  problem: baseUrl + "api/problems",
  user: baseUrl + "api/users",
  createProblem: baseUrl + "api/problems/create",
  updateProblem: baseUrl + "api/problems/update",
  getCompetitionProblem: baseUrl + "api/competitions/problem/id",
  getTimestamp: baseUrl + "api/competitions/timestamp",
  getUserSubmissions: baseUrl + "api/competitions/getusersubmisions",
  getAllSubmissions: baseUrl + "api/competitions/getallsubmisions",
  getLeaderboard: baseUrl + "api/competitions/getleaderboard",
  getTopicCounts: baseUrl + "api/problems/topic-counts",
  getUsers: baseUrl + "api/users",
  getSearchedProblems: baseUrl + "api/problems/search"
};

export const adminRoutes = {
  getProblems: baseUrl + "api/problems/admin",
  getProblemIds: baseUrl + "api/problems/admin/ids",
  adminUserId: baseUrl + "api/users/admin",
};
