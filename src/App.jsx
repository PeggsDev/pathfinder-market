import './App.scss';
import NavBar from "./componenets/NavBar/NavBar";
import CardComponent from "./componenets/CardComponent/CardComponent";
import CoreRulebook from './img/pathfinder-2e-core-rulebook.jpg'
import PrimerBook from './img/pathfinder-primer.jpg'
import Bestiary from './img/bestiary.jpg'
import GameMasteryGuide from './img/game-mastery.jpg'

import background from './img/parallax-background.jpg'

function App() {

    return (
        <div>
            <NavBar/>
            <div className={'parallax-wrapper'}>
                <section className={'header'}>
                    <img src={background} alt="background" className={'background'}/>
                    {/*<section className={'card-block'}>*/}
                    {/*    <CardComponent*/}
                    {/*        price={'£34.99'}*/}
                    {/*        bookName={'Core Rulebook'}*/}
                    {/*        imagePath={CoreRulebook}*/}
                    {/*        summary={*/}
                    {/*            `This indispensable volume contains the core rules for players and Game Masters, */}
                    {/*    and is your first step on a heroic new journey!`*/}
                    {/*        }/>*/}
                    {/*    <CardComponent*/}
                    {/*        price={'£34.99'}*/}
                    {/*        bookName={'Bestiary'}*/}
                    {/*        imagePath={Bestiary}*/}
                    {/*        summary={*/}
                    {/*            `Over 400 of fantasy's fiercest foes burst from the pages of this enormous compendium */}
                    {/*    of the most popular and commonly encountered creatures in the world of Pathfinder!`*/}
                    {/*        }/>*/}
                    {/*    <CardComponent*/}
                    {/*        price={'£34.99'}*/}
                    {/*        bookName={'Gamemastery Guide'}*/}
                    {/*        imagePath={GameMasteryGuide}*/}
                    {/*        summary={*/}
                    {/*            `Whether you are a new Game Master or experienced storyteller, */}
                    {/*    you can always find new ways to hone your craft.`*/}
                    {/*        }/>*/}
                    {/*    <CardComponent*/}
                    {/*        price={'£0'}*/}
                    {/*        bookName={'Pathfinder Primer'}*/}
                    {/*        imagePath={PrimerBook}*/}
                    {/*        summary={*/}
                    {/*            `This free resource contains everything you need to learn how to play Pathfinder,*/}
                    {/*including rules to create your own hero and tools to make your own amazing stories.`*/}
                    {/*        }/>*/}
                    {/*</section>*/}

                </section>
                <section className={'card-block'}>
                    <CardComponent
                        price={'£34.99'}
                        bookName={'Core Rulebook'}
                        imagePath={CoreRulebook}
                        summary={
                            `This indispensable volume contains the core rules for players and Game Masters, 
                        and is your first step on a heroic new journey!`
                        }/>
                    <CardComponent
                        price={'£34.99'}
                        bookName={'Bestiary'}
                        imagePath={Bestiary}
                        summary={
                            `Over 400 of fantasy's fiercest foes burst from the pages of this enormous compendium 
                        of the most popular and commonly encountered creatures in the world of Pathfinder!`
                        }/>
                    <CardComponent
                        price={'£34.99'}
                        bookName={'Gamemastery Guide'}
                        imagePath={GameMasteryGuide}
                        summary={
                            `Whether you are a new Game Master or experienced storyteller, 
                        you can always find new ways to hone your craft.`
                        }/>
                    <CardComponent
                        price={'£0'}
                        bookName={'Pathfinder Primer'}
                        imagePath={PrimerBook}
                        summary={
                            `This free resource contains everything you need to learn how to play Pathfinder,
                    including rules to create your own hero and tools to make your own amazing stories.`
                        }/>
                </section>
            </div>
        </div>
    );
}

export default App;
