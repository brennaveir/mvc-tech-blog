module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    user_validation: (current_user, comment_author) => {
      if (current_user === comment_author) {
        console.log(current_user)
        console.log(comment_author)
        return true;
      }
      else {
        return false;
      }
    }
}