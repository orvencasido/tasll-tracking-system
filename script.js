var app = new function() {
  this.el = document.getElementById('tasks');
  this.tasks = [];

  // Fetch and render all tasks
  this.FetchAll = function() {
    var data = '';

    if (this.tasks.length > 0) {
      for (i = 0; i < this.tasks.length; i++) {
          data += '<tr>';
          // Display the task number
          data += '<td>' + (i + 1) + '</td>';
          // Display the task text
          data += '<td>' + this.tasks[i] + '</td>';
          // Add Edit and Delete buttons with the task index
          data += '<td><button onclick="app.Edit(' + i + ')" class="btn btn-warning">Edit</button></td>';
          data += '<td><button onclick="app.Delete(' + i + ')" class="btn btn-danger">Delete</button></td>';
          data += '</tr>';
      }
    } else {
      // Handle the case when no tasks are available
      data = '<tr><td colspan="4" class="text-center">No tasks added</td></tr>';
    }

    // Update the table with task data
    this.Count(this.tasks.length);
    return this.el.innerHTML = data;
  };

  // Add a new task
  this.Add = function () {
    var el = document.getElementById('add-todo');
    var task = el.value;

    if (task) {
      // Add the new task to the array
      this.tasks.push(task.trim());
      // Reset the input value
      el.value = '';
      // Re-render the tasks
      this.FetchAll();
    }
  };

  // Edit an existing task
  this.Edit = function (item) {
    var el = document.getElementById('edit-todo');
    el.value = this.tasks[item]; // Set the current task text in the input field
    document.getElementById('edit-box').style.display = 'block';

    var self = this;
    document.getElementById('save-edit').onsubmit = function() {
      var task = el.value;
      if (task) {
        self.tasks.splice(item, 1, task.trim()); // Update the task
        self.FetchAll(); // Re-render tasks
        CloseInput();
      }
    }
  };

  // Delete a task
  this.Delete = function (item) {
    this.tasks.splice(item, 1); // Remove the task from the array
    this.FetchAll(); // Re-render tasks
  };

  // Update the task count in the UI
  this.Count = function(data) {
    var el = document.getElementById('counter');
    var name = 'Tasks';

    if (data) {
      if(data == 1){
        name = 'Task';
      }
      el.innerHTML = data + ' ' + name;
    } else {
      el.innerHTML = 'No ' + name;
    }
  };
}

app.FetchAll(); // Initially fetch and display tasks

// Close the edit box
function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}
