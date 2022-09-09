import { SearchInput } from '../../components/SearchInput';
import styles from '../../styles/Home.module.css';

const Home = () => {
    const handleSearch = (searchValue: string) =>{}
    return(
        <div className= {styles.container}>
            <header className= {styles.header}>
                <div className= {styles.headerTop}>
                    <div className= {styles.headTopLeft}>
                        <div className= {styles.headerTitle}>
                            Seja Bem Vindo (a)👋
                        </div>
                        <div className={styles.headerSubtitle}>
                           O que deseja para hoje? 
                        </div>

                    </div>
                    <div className={styles.headerTopRight}>
                        <div className= {styles.menuButton}>
                            <div className={styles.menuButtonLine}></div>
                            <div className={styles.menuButtonLine}></div>
                            <div className={styles.menuButtonLine}></div>
                        </div>
                        </div>    
                </div>
                <div className={styles.headerBotton}>
                    <SearchInput
                        mainColor='#FB9400'
                        onSearch={handleSearch}
                    
                    />
                </div>
            </header>
           
        </div>
    )
}

export default Home;