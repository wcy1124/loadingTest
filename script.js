document.addEventListener('DOMContentLoaded', () => {
    const gameCoin = document.querySelector('.game-coin');
    const container = document.querySelector('.container');
    const slot = document.querySelector('.machine');
    const initialSrc = 'img/coin1.png';
    const grabbedSrc = 'img/coin2.png';
    let isDragging = false;

    gameCoin.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        gameCoin.src = grabbedSrc;


        const offsetX = e.clientX - gameCoin.getBoundingClientRect().width;
        const offsetY = e.clientY - gameCoin.getBoundingClientRect().height;

        gameCoin.style.pointerEvents = 'none';

        function mouseMoveHandler(e) {
            if (!isDragging) return;

            gameCoin.style.left = `${e.clientX - offsetX}px`;
            gameCoin.style.top = `${e.clientY - offsetY}px`;
        }

        function mouseUpHandler() {
            isDragging = false;
            gameCoin.src = initialSrc;
            gameCoin.style.pointerEvents = 'auto';
            
            const coinRect = gameCoin.getBoundingClientRect();
            const slotRect = slot.getBoundingClientRect();

            const isOverSlot = (
                coinRect.left < slotRect.right &&
                coinRect.right > slotRect.left &&
                coinRect.top < slotRect.bottom &&
                coinRect.bottom > slotRect.top
            );

            if (isOverSlot) {
                container.style.display = 'none';
            }

            gameCoin.style.position = '';
            gameCoin.style.left = '';
            gameCoin.style.top = '';
            
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});