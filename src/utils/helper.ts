

export function helper() {

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return {
        goToTop,
    }

}
