import React from 'react'
import {connect} from 'react-redux'
import './styles.scss'
import Info from '../../components/common/Info'

/**
 * Home Page
 *
 *  - Ethereum Account Info
 *  - Ethereum Blockchain Info
 *  - Project description
 */
let HomePage = (props) => {
  const {
          contractAddressMembers,
          contractAddressVotes,
          contractAddressOwned,
          dao,
          ethereum,
          user,
          web3
        } = props

  return (
    <div id="home-page">
      <div className="row">
        <div className="col">
          <h2>Home</h2>
        </div>
      </div>

      <Info
        defaultAccount={user && user.defaultAccount}
        balance={user && user.balance}
        blockNumber={ethereum && ethereum.blockNumber}
        currentProvider={web3 && web3.currentProvider && web3.currentProvider.host}
        //currentProvider={web3 && web3.currentProvider.host ? web3.currentProvider.host : web3.currentProvider.constructor.name} // fix metamask testnet
        contractAddressMembers={contractAddressMembers}
        contractAddressOwned={contractAddressOwned}
        contractAddressVotes={contractAddressVotes}
        isWeb3Connected={web3 && web3.isConnected}
        ownerAddress={dao && dao.ownerAddress}
      />

      <div className="row">
        <div className="col">
          <h2>What is Dao 1901 ?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
          </p>
        </div>

        <div className="col">
          <h2>How does it works</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
          </p>
        </div>

        <div className="col">
          <h2>Additional Infos</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
            dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
            velit
            veritatis?
          </p>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    contractAddressMembers: state.dao && state.dao.contract && state.dao.contract.Dao1901Members.address,
    contractAddressVotes: state.dao && state.dao.contract && state.dao.contract.Dao1901Votes.address,
    contractAddressOwned: state.dao && state.dao.contract && state.dao.contract.Owned.address,
    dao: state.dao,
    ethereum: state.ethereum,
    isConnected: state.web3Wrap.isConnected,
    user: state.user,
    web3: {...state.web3Wrap.web3, isConnected: state.web3Wrap.isConnected}
  }
}
export default connect(mapStateToProps)(HomePage)