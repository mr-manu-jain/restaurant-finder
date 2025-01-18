export const PageLayout = (props) => {
    // Add your main page content below props.children
    return (
        <>
            {/* Navbar is already handled in App.jsx */}
            
            {/* Render children (dynamic page content) */}
            {props.children}
            

            {/* Render middle content below */}

            
            {/* Footer is already handled in App.jsx */}
            
        </>
    );
}