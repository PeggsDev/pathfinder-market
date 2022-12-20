import './App.css';
import NavBar from "./componenets/NavBar/NavBar";
import SearchBar from "./componenets/SearchBar/SearchBar";
import CardComponent from "./componenets/CardComponent/CardComponent";
import CoreRulebook from './img/pathfinder-2e-core-rulebook.jpg'
import PrimerBook from './img/pathfinder-primer.jpg'

function App() {

    return (
        <div>
            <NavBar logo={''}>
                <SearchBar/>
            </NavBar>
            {/*<CardComponent*/}
            {/*    bookName={'Core Rulebook'}*/}
            {/*    imagePath={CoreRulebook}/>*/}
            <CardComponent
                price={'35.99'}
                bookName={'Pathfinder 2e Primer'}
                imagePath={PrimerBook}
                summary={
                    `This free resource contains everything you need to learn how to play Pathfinder,
                    including rules to create your own hero and tools to make your own amazing stories.`
                }/>
        </div>
    );
}

export default App;
