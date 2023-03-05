import './HomePage.scss'
import ingloriousDreagons from "../../images/inglorious-dragons-text.png";
import background from "../../images/parallax-background.jpg";
import SlidingCard from "../../componenets/SlidingCard/SlidingCard";
import CoreRulebook from "../../images/pathfinder-2e-core-rulebook.jpg";
import Bestiary from "../../images/bestiary.jpg";
import GameMasteryGuide from "../../images/game-mastery.jpg";
import PrimerBook from "../../images/pathfinder-primer.jpg";
import React, { useEffect } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook";

export default function HomePage() {

    const [ref, { entry, rootRef }] = useIntersectionObserver();
    const isVisible = entry && entry.isIntersecting;

    useEffect(() => {
        //TO-DO - React to intersection events from the webpage
    }, [isVisible]);

    return (
        <div className={'parallax-wrapper'} ref={rootRef}>
            <section className={'header'}>
                <img src={ingloriousDreagons} alt='inglorious-dragons-text' className={'inglorious-dragons-text'} />

                <img src={background} alt='background' className={'background'} />
                <div className={'foreground'}>
                    <section className={'card-block'} ref={ref}>
                        <SlidingCard
                            price={'£34.99'}
                            bookName={'Core Rulebook'}
                            imagePath={CoreRulebook}
                            summary={
                                `This indispensable volume contains the core rules for players and Game Masters, 
                                    and is your first step on a heroic new journey!`} />
                        <SlidingCard
                            price={'£34.99'}
                            bookName={'Bestiary'}
                            imagePath={Bestiary}
                            summary={
                                `Over 400 of fantasy's fiercest foes burst from the pages of this enormous compendium 
                                    of the most popular and commonly encountered creatures in the world of Pathfinder!`} />
                        <SlidingCard
                            price={'£34.99'}
                            bookName={'Gamemastery Guide'}
                            imagePath={GameMasteryGuide}
                            summary={
                                `Whether you are a new Game Master or experienced storyteller, 
                                    you can always find new ways to hone your craft.`} />
                        <SlidingCard
                            price={'£0'}
                            bookName={'Pathfinder Primer'}
                            imagePath={PrimerBook}
                            summary={
                                `This free resource contains everything you need to learn how to play Pathfinder,
                                    including rules to create your own hero and tools to make your own amazing stories.`} />
                    </section>
                </div>
            </section>
        </div>
    )
}