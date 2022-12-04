import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Gameboard } from '../game/Gameboard'
import { UIGameboard } from '../ui/UIGameboard'
import { UIPlayerScreen } from '../ui/UIPlayerScreen'
import { BunnyKingdomGame } from '../game/BunnykingdomGame'
import { PlayerColors, SkyTowerColors } from '../game/dictionaries/Colors'
import { BuildingCard, TileCard } from '../game/Card'
import { Building, BuildingType } from '../game/Building'
import { Resource } from '../game/Resource'
import { UICard } from '../ui/UICard'
import { UIHand } from '../ui/UIHand'
import { UIGame } from '../ui/Temp'

let game: BunnyKingdomGame = new BunnyKingdomGame()
game.handleAddPlayer("Jay", PlayerColors.White)
game.handleAddPlayer("Rachel", PlayerColors.Pink)
let jay = game.players[0]
let rachel = game.players[1]
game.handleStartGame()
console.log(jay.hand)
console.log(rachel.hand)

export default function Home() {
  // let gameboard: Gameboard = new Gameboard()


  // let tileCard1 = new TileCard(6,3)
  // let tileCard2 = new TileCard(8,9)
  // let resourceBuilding = {type: BuildingType.Resource, resource: Resource.Fish} as Building
  // let camp = {type: BuildingType.Camp, campNumber: 3} as Building
  // let skytower = {type: BuildingType.SkyTower, color: SkyTowerColors.Purple} as Building

  // let building1 = camp
  // let building2 = skytower
  // let buildingCard1 = new BuildingCard(building1, "im jay")
  // let buildingCard2 = new BuildingCard(building2, "you are jay")
  // player.hand.push(tileCard1)
  // player.hand.push(tileCard2)
  // player.hand.push(buildingCard1)
  // player.hand.push(buildingCard2)
  // game.handleSelectCard(player.id, tileCard1)
  // game.handleSelectCard(player.id, tileCard2)
  // game.handleSelectCard(player.id, buildingCard1)
  // game.handleSelectCard(player.id, buildingCard2)
  // game.handlePlayBuilding(player.id, building1, {row:8, col: 3})
  // game.handlePlayBuilding(player.id, building2, {row:6, col:3}, {row:8, col:9})

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>



        {/* <UIGame></UIGame> */}
        <UIPlayerScreen gameboard={game.gameboard} />
        <UIHand hand={jay.hand}/>
        {/* <UICard card={tileCard1}></UICard>
        <UICard card={buildingCard1}></UICard> */}






        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
