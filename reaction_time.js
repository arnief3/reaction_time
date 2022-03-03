// states
const init_st = 0
const wait_go = 1
const wait_click = 2

var state = init_st;

var last_time = 0;
var timeout;

// stats
var games_played = 0;
var total_time = 0;

function rt_go() {
    document.getElementById('user_msg').innerHTML = "Go! (press any key)";
    last_time =  Date.now()
    state = wait_click;
}

function handle_keypress() {
    switch (state) {
        case init_st:
            document.getElementById('user_msg').innerHTML = "Get ready...";
            timeout = setTimeout(rt_go, Math.random()*2000 + 2000);
            state = wait_go;
        break;
        case wait_go:
            document.getElementById('user_msg').innerHTML = "Too early, game over...  <br/>Press any key to play again.";
            clearTimeout(timeout);
            // clear stats
            games_played = 0;
            total_time = 0;
            document.getElementById('stats').innerHTML = '';
            state = init_st;
        break;
        case wait_click:
            var cur_time =  Date.now()
            document.getElementById('user_msg').innerHTML = `Reaction time: ${cur_time - last_time}ms <br/>Press any key to play again.`;
            games_played++;
            total_time += cur_time - last_time;
            document.getElementById('stats').innerHTML = `Games played: ${games_played}  <br/>Average reaction time: ${(total_time/games_played).toFixed(1)} ms`;
            state = init_st;
        break;
    }
}

window.addEventListener('keydown', function (e) {
    handle_keypress();
  }, false);

window.addEventListener("click", handle_keypress);

