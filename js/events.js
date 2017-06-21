/**
 * Created by Darrell on 06/21/2017.
 */
var event = {
    events: {},
    on: function(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][0] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    },

    emit: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};

var people = ['bobby'];
/**
 * every object with a setPeople will be updated
 * @param count
 * @returns {*}
 */
function setPeople(count) {
    return count;
}
//event.emit('peopleChanged', people.length);
event.on('peopleChange', setPeople());