// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    // get new messages every 5 seconds
    setInterval(App.fetch, 5000);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      if (Messages._data.length === 0 || data[0].message_id !== parseInt(Object.keys(Messages._data)[Object.keys(Messages._data).length - 1])) {
        Messages.update(data);
        MessagesView.render();
      }
      callback();
      // TODO: Use the data to update Messages and Rooms
      // and re-render the corresponding views.
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
