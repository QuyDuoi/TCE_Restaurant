// Scr/Modals.tsx
import { View } from "react-native";
import AlertDialog from "./alertDialog";
import BlogPostPublishedModal from "./modalAdd";
import DeletePostModal from "./modalDelete";
import UnsavedChangesModal from "./modalSave";

const handleDelete = () => {
  // Your delete logic here
};

const handleCancel = () => {
  // Your cancel logic here
};

const handleConfirm = () => {
  // Your confirm logic here
};

const Modals = () => {
  return (
    <View>
      {/* <BlogPostPublishedModal
        title="New Blog Post"
        content="Your new blog post has been successfully published!"
        onConfirm={handleConfirm}
      /> */}

      {/* <DeletePostModal
        title="Delete Post"
        content="Are you sure you want to delete this post? This action cannot be undone."
        onDelete={handleDelete}
        onCancel={handleCancel}
      /> */}
      
      <UnsavedChangesModal
        title="Unsaved changes"
        content="Do you want to save or discard changes?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* <AlertDialog isSuccess={true} message="This is a success message!" />
      <AlertDialog isSuccess={false} message="This is an error message." /> */}
    </View>
  );
};

export default Modals;
