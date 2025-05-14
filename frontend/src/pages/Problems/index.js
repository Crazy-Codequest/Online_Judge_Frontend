import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Paper,
  Typography,
  useTheme,
  Button,
  Avatar,
  InputAdornment,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Badge,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Star,
  Lock,
  MenuBook,
  Forum,
  Assignment,
  Favorite,
  CalendarToday,
  EmojiEvents,
  Search,
  CheckCircle,
  ListAlt,
  TrendingUp,
  School,
  LibraryBooks,
  PlayCircleFilled,
  ArrowForwardIos,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { PROBLEMS_PER_PAGE } from "../../utils/constants";
import { urlConstants } from "../../apis";
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const difficultyColors = {
  easy: "#4CAF50",
  medium: "#FF9800",
  hard: "#F44336",
};

const sidebarLists = [
  { icon: <LibraryBooks />, label: "Library" },
  { icon: <School />, label: "Study Plan" },
  { icon: <Forum />, label: "Discuss" },
];


const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicCounts, setTopicCounts] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PROBLEMS_PER_PAGE,
  });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [search, setSearch] = useState("");
  const [myLists, setMyLists] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [openNewListDialog, setOpenNewListDialog] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedListForAdd, setSelectedListForAdd] = useState(null);
  const [editingList, setEditingList] = useState(null);
  const [listDescription, setListDescription] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  

  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const borderColor = theme.palette.border.secondary;
  const hoverColor = isLightMode ? "#f0f7ff" : "#333";

  useEffect(() => {
    const getProblems = async () => {
      try {
        const { data } = await axios.get(urlConstants.getProblems, getConfig());
        setProblems(data.problems);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const getTopicCounts = async () => {
      try {
        const { data } = await axios.get(
          urlConstants.getTopicCounts,
          getConfig()
        );
        setTopicCounts(data.topicCounts);
      } catch (e) {
        console.log(e);
      }
    };

    const getMyLists = async () => {
      try {
        const { data } = await axios.get(
          `${urlConstants.getLists}?user_id=${user.id}`,
          getConfig()
        );
        setMyLists(data.lists);
      } catch(e){
        console.log(e);
      }
    };

    getProblems();
    getTopicCounts();
    getMyLists();
  }, []);

  const filteredProblems = problems.filter(
    (p) =>
      (!selectedTopic || p.topic === selectedTopic) &&
      (!search || p.statement.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelectProblem = (problemId) => {
    setSelectedProblems(prev => 
      prev.includes(problemId) 
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProblems.length === filteredProblems.length) {
      setSelectedProblems([]);
    } else {
      setSelectedProblems(filteredProblems.map(p => p._id));
    }
  };

  const handleCreateList = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.createList,
        { 
          name: newListName, 
          description: listDescription,
          user_id: user.id,
          problems: [] 
        },
        getConfig()
      );
      setMyLists(prev => [...prev, data.list]);
      setOpenNewListDialog(false);
      setNewListName("");
      setListDescription("");
      toast.success("List created successfully!");
    } catch (e) {
      toast.error("Failed to create list");
      console.error(e);
    }
  };

  const handleEditList = async () => {
    if (!editingList) return;
    
    try {
      const { data } = await axios.post(
        urlConstants.updateList,
        {
          id: editingList._id,
          name: newListName,
          description: listDescription,
          problems: editingList.problems
        },
        getConfig()
      );
      
      setMyLists(prev => 
        prev.map(list => 
          list._id === editingList._id ? data.list : list
        )
      );
      
      setOpenEditDialog(false);
      setEditingList(null);
      setNewListName("");
      setListDescription("");
      toast.success("List updated successfully!");
    } catch (e) {
      toast.error("Failed to update list");
      console.error(e);
    }
  };

  const handleDeleteList = async () => {
    if (!listToDelete || !listToDelete._id) {
        toast.error("No list selected for deletion.");
        return;
    }

    try {
        await axios.post(
            urlConstants.deleteList,
            { id: listToDelete._id },
            getConfig()
        );

        setMyLists(prev => prev.filter(list => list._id !== listToDelete._id));
        setOpenDeleteDialog(false);
        setListToDelete(null);
        toast.success("List deleted successfully!");
    } catch (e) {
        toast.error("Failed to delete list");
        console.error(e);
    }
  };

  const openEditListDialog = (list) => {
    setEditingList(list);
    setNewListName(list.name);
    setListDescription(list.description || "");
    setOpenEditDialog(true);
  };

  const openDeleteListDialog = (list) => {
    setListToDelete(list);
    setOpenDeleteDialog(true);
  };

  const handleAddToList = async (listId) => {
    try {
      // Get the current list to update
      const currentList = myLists.find(list => list._id === listId);
      if (!currentList) {
        throw new Error("List not found");
      }

      // Create new problems array by combining existing and new problems
      const updatedProblems = [...new Set([...currentList.problems, ...selectedProblems])];

      // Update the list with new problems
      const { data } = await axios.post(
        urlConstants.updateList,
        {
          id: listId,
          name: currentList.name,
          description: currentList.description,
          problems: updatedProblems
        },
        getConfig()
      );

      // Update the lists in state
      setMyLists(prev => 
        prev.map(list => 
          list._id === listId ? data.list : list
        )
      );

      toast.success(`Added ${selectedProblems.length} problem(s) to ${currentList.name}`);
      setAnchorEl(null);
      setSelectedProblems([]);
    } catch (e) {
      toast.error("Failed to add problems to list");
      console.error(e);
    }
  };

  // --- UI ---
  if (loading) return <Loading />;

  const activeAvatarBg = '#1976d2';

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.background.main,
        minHeight: "100vh",
        p: { xs: 2, lg: 0 },
      }}
    >
      <Box
        sx={{
          width: 240,
          borderRight: `1px solid ${borderColor}`,
          px: 2,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Divider sx={{ mt: 1 }} />
        <Typography
          variant="subtitle2"
          sx={{ ml: 1, fontSize: 15, fontWeight: 600 }}
        >
          My Lists
        </Typography>
        <List>
          {myLists.map((item) => (
            <ListItem
              button
              key={item._id}
              sx={{
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Assignment />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                  primaryTypographyProps={{ fontSize: 16 }}
                  secondaryTypographyProps={{ fontSize: 13 }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
                <Tooltip title="Edit">
                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    openEditListDialog(item);
                  }}>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    openDeleteListDialog(item);
                  }}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<Add />}
          onClick={() => {
            setEditingList(null);
            setNewListName("");
            setListDescription("");
            setOpenNewListDialog(true);
          }}
          sx={{
            mt: 1,
            ml: 1,
            fontSize: 15,
            textTransform: "none",
            boxShadow: "none",
            bgcolor: "transparent",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
          size="medium"
        >
          New List
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 0,
          py: 4,
          width: "100%",
          overflowX: { xs: "auto", lg: "hidden" },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 950, mx: "auto" }}>
          {/* Announcement Banner */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              overflowX: "auto",
              pb: 1,
              width: "100%",
            }}
          >
            <Card
              sx={{
                minWidth: 260,
                bgcolor: theme.palette.background.main,
                fontSize: 16,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography fontWeight={700} gutterBottom fontSize={17}>
                  Codequest's Interview Crash Course:
                </Typography>
                <Typography variant="body2" fontSize={15}>
                  System Design for Interviews and Beyond
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontSize: 15,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                minWidth: 260,
                bgcolor: theme.palette.background.main,
                fontSize: 16,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography fontWeight={700} gutterBottom fontSize={17}>
                  Codequest's Interview Crash Course:
                </Typography>
                <Typography variant="body2" fontSize={15}>
                  Data Structures and Algorithms
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontSize: 15,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                minWidth: 260,
                bgcolor: theme.palette.background.main,
                fontSize: 16,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography fontWeight={700} gutterBottom fontSize={17}>
                  New & Trending Company Qs
                </Typography>
                <Typography variant="body2" fontSize={15}>
                  Latest Qs From Big Tech
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontSize: 15,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Claim Now
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 2,
              overflowX: "auto",
              pb: 1,
              width: "100%",
            }}
          >
            <Chip
              label="All Topics"
              color={!selectedTopic ? "primary" : "default"}
              onClick={() => setSelectedTopic(null)}
              sx={{
                fontWeight: 700,
                fontSize: 15,
                px: 2,
                height: 36,
                bgcolor: !selectedTopic ? "#e0e0e0" : "#fff",
                border: "none",
                boxShadow: "none",
              }}
            />
            {topicCounts.map((topic) => (
              <Chip
                key={topic._id}
                label={`${topic._id} (${topic.count})`}
                color={selectedTopic === topic._id ? "primary" : "default"}
                onClick={() => setSelectedTopic(topic._id)}
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  px: 2,
                  height: 36,
                  border: "none",
                  boxShadow: "none",
                }}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            placeholder="Search questions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 2,
              borderRadius: 2,
              fontSize: 16,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#111" }} />
                </InputAdornment>
              ),
              style: { fontSize: 16, height: 44 },
            }}
            inputProps={{ style: { fontSize: 16, height: 44 } }}
          />

          {selectedProblems.length > 0 && (
            <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography>{selectedProblems.length} problem(s) selected</Typography>
              <Button
                variant="contained"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                startIcon={<Add />}
                disabled={myLists.length === 0}
              >
                Add to List
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: { maxHeight: 300 }
                }}
              >
                {myLists.length === 0 ? (
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      No lists available. Create a list first.
                    </Typography>
                  </MenuItem>
                ) : (
                  myLists.map((list) => (
                    <MenuItem 
                      key={list._id} 
                      onClick={() => handleAddToList(list._id)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        py: 1
                      }}
                    >
                      <Typography variant="body1">{list.name}</Typography>
                      {list.description && (
                        <Typography variant="caption" color="text.secondary">
                          {list.description}
                        </Typography>
                      )}
                    </MenuItem>
                  ))
                )}
              </Menu>
            </Box>
          )}

          <Paper
            sx={{
              p: 0,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "none",
              border: `1px solid ${borderColor}`,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                bgcolor: theme.palette.background.main,
                borderBottom: `1px solid ${borderColor}`,
                px: 2,
                py: 1,
                fontWeight: 700,
                fontSize: 16,
                alignItems: "center",
              }}
            >
              <Box sx={{ width: 40 }}>
                <Checkbox
                  checked={selectedProblems.length === filteredProblems.length}
                  indeterminate={selectedProblems.length > 0 && selectedProblems.length < filteredProblems.length}
                  onChange={handleSelectAll}
                />
              </Box>
              <Box sx={{ flex: 2 }}>Title</Box>
              <Box sx={{ width: 120, textAlign: "center" }}>Acceptance</Box>
              <Box sx={{ width: 100, textAlign: "center" }}>Difficulty</Box>
              <Box sx={{ width: 140, textAlign: "center" }}>Topic</Box>
            </Box>
            {filteredProblems.length === 0 && (
              <Typography sx={{ p: 3, textAlign: "center", fontSize: 16 }}>
                No problems found.
              </Typography>
            )}
            {filteredProblems
              .slice(
                paginationModel.page * paginationModel.pageSize,
                (paginationModel.page + 1) * paginationModel.pageSize
              )
              .map((problem, idx) => (
                <Box
                  key={problem._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                    borderBottom: `1px solid ${borderColor}`,
                    bgcolor: theme.palette.background.main,
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: 16,
                    "&:hover": { bgcolor: hoverColor },
                  }}
                  component={Link}
                  to={`/problems/statement/${problem._id}`}
                >
                  <Box sx={{ width: 40 }}>
                    <Checkbox
                      checked={selectedProblems.includes(problem._id)}
                      onChange={() => handleSelectProblem(problem._id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: 2,
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {problem.statement}
                  </Box>
                  <Box
                    sx={{
                      width: 120,
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {problem.acceptance
                      ? `${problem.acceptance.toFixed(1)}%`
                      : "-"}
                  </Box>
                  <Box sx={{ width: 100, textAlign: "center" }}>
                    <Chip
                      label={problem.difficulty}
                      size="medium"
                      sx={{
                        bgcolor: difficultyColors[problem.difficulty] || "#eee",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                        textTransform: "capitalize",
                        height: 32,
                        border: "none",
                        boxShadow: "none",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 140,
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {problem.topic}
                  </Box>
                </Box>
              ))}
          </Paper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              fontSize: 16,
            }}
          >
            <Button
              disabled={paginationModel.page === 0}
              onClick={() =>
                setPaginationModel((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              sx={{
                fontSize: 15,
                px: 2,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Previous
            </Button>
            <Typography sx={{ mx: 2, alignSelf: "center", fontSize: 16 }}>
              Page {paginationModel.page + 1} of{" "}
              {Math.ceil(filteredProblems.length / paginationModel.pageSize)}
            </Typography>
            <Button
              disabled={
                (paginationModel.page + 1) * paginationModel.pageSize >=
                filteredProblems.length
              }
              onClick={() =>
                setPaginationModel((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              sx={{
                fontSize: 15,
                px: 2,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: 300,
          borderLeft: `1px solid ${borderColor}`,
          py: 3,
          px: 2,
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            border: `1px solid ${borderColor}`,
            bgcolor: theme.palette.background.main,
          }}
        >
          <Typography fontWeight={700} sx={{ mb: 1, fontSize: 16 }}>
            Top Solvers
          </Typography>
          <List>
            {["Alice", "Bob", "Charlie", "David", "Eve"].map((solver, idx) => (
              <ListItem key={idx} sx={{ px: 0 }}>
                <ListItemText
                  primary={`${idx + 1}. ${solver}`}
                  primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 14, color: theme.palette.text.secondary }}
                >
                  {Math.floor(Math.random() * 1000)} pts
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            border: `1px solid ${borderColor}`,
            bgcolor: theme.palette.background.main,
          }}
        >
          <Typography fontWeight={700} sx={{ mb: 1, fontSize: 16 }}>
            Would you recommend your friends to try the new Library?
          </Typography>
          <Box sx={{ display: "flex", gap: 0.2, flexwrap: "wrap" }}>
            {["😞", "🤔", "😐", "😃", "🤩"].map((emoji, idx) => (
              <IconButton
                key={idx}
                sx={{ fontSize: 22, color: activeAvatarBg }}
              >
                {emoji}
              </IconButton>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* New/Edit List Dialog */}
      <Dialog 
        open={openNewListDialog || openEditDialog} 
        onClose={() => {
          setOpenNewListDialog(false);
          setOpenEditDialog(false);
          setEditingList(null);
          setNewListName("");
          setListDescription("");
        }}
      >
        <DialogTitle>
          {editingList ? "Edit List" : "Create New List"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={listDescription}
            onChange={(e) => setListDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenNewListDialog(false);
            setOpenEditDialog(false);
            setEditingList(null);
            setNewListName("");
            setListDescription("");
          }}>
            Cancel
          </Button>
          <Button 
            onClick={editingList ? handleEditList : handleCreateList} 
            variant="contained"
          >
            {editingList ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setListToDelete(null);
        }}
      >
        <DialogTitle>Delete List</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the list "{listToDelete?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenDeleteDialog(false);
            setListToDelete(null);
          }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteList} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Problems;
