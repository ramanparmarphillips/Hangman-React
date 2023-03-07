// Function for showing the notification when a letter is already selected
export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

// Function for checking if the game is won or lost
export function checkWin(correct, wrong, word) {
    let status = 'win';

    // Check for win
    word.split('').forEach(letter => {
        if (!correct.includes(letter)) {
            status = '';
        }
    });

    // Check for lose
    if (wrong.length === 6) status = 'lose';

    return status;
}