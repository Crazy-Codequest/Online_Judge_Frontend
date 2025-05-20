import { writeStorage } from "@rehooks/local-storage";

const useAvatar = () => {
    function updateUserAvatar(props) {
      try {
        writeStorage("avatar", props);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    return { updateUserAvatar };
}

export default useAvatar;
