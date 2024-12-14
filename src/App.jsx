import Grid from './Grid';

function App() {
    return (
        <>
            <header className="py-6 border-b-4 border-blue-500 bg-gray-100">
                <h1 className="text-center text-4xl font-bold text-gray-800">
                    Sudoku<span className="text-blue-500">_Solver</span>
                </h1>
            </header>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-16">
              <Grid />
            </div>

        </>
    );
}

export default App;
