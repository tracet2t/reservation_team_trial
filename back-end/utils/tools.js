const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
        return 'NaN-NaN-NaN';
    }
    
    return date.toISOString().split('T')[0]; 
};

  
  const isDueDatePassed = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };
  
  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - now;
  
    if (timeDiff < 0) {
      return 'Due Date Passed';
    }
  
    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    console.log(daysRemaining,hoursRemaining)
  
    return `${daysRemaining} days ${hoursRemaining} hours remaining`;
  };
  

  module.exports = {
    formatDate,
    isDueDatePassed,
    calculateRemainingTime,
};