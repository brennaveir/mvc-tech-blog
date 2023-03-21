module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    user_validation: (current_user, comment_author) => {
      if (comment_author === current_user) {
        return true;
      }
      else {
        return false;
      }
    }
}