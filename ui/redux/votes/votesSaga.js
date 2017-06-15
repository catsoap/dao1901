/******************************************************************************/
/**************************** ETHEREUM ***************************************/
/******************************************************************************/
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'

/**
 * onVoteSubmit
 */
let onVoteSubmit = (Dao1901Votes, defaultAccount, proposalId, voteValue) => {
  return new Promise((resolve, reject) => {
    Dao1901Votes.vote.sendTransaction(proposalId, voteValue, {from: defaultAccount})
      .then(tx => {
        console.log(`Vote tx hash: ${tx}`)
        resolve(tx)
      })
      .catch(e => reject(e))
  })
}
function* onVoteSubmitWorker(action) {
  const {proposalId, voteValue} = action.values
  try {
    let o = yield select(s => {
      return {
        Dao1901Votes: s.dao.contract.Dao1901Votes,
        defaultAccount: s.user.defaultAccount
      }
    })
    const tx = yield call(onVoteSubmit, o.Dao1901Votes, o.defaultAccount, proposalId, voteValue)
    yield put({type: 'VOTE_SUBMISSION_SUCCEED', tx})
  } catch (e) {
    yield put({type: 'VOTE_SUBMISSION_SUCCEED', error: e})
  }
}

/**
 * fetchProposalByIndex
 * @param Dao1901Votes
 * @param proposalId
 * @returns {*|Promise.<T>}
 */
let fetchProposalByIndex = (Dao1901Votes, proposalId) => {
  return Dao1901Votes.proposals(proposalId)
    .then((proposal) => {
      return {
        proposalDesc: proposal[0],
        proposalDeadline: proposal[1].toNumber(),
        voterHead: proposal[2]
      }})
    .catch((err) => {throw new Error(err.message)})
}

/**
 * getTotalProposals
 * @param Dao1901Votes
 */
let getTotalProposals = (Dao1901Votes) => Dao1901Votes.nProposals().then(n => n.valueOf())

/**
 * fetchAllVotesForAProposal
 * @param Dao1901Votes
 * @param proposalId
 * @returns {Promise}
 */
let fetchAllVotesForAProposal = (Dao1901Votes, proposalId) => {
  return new Promise((resolve, reject) => {
    let votes = []
    let addr = 0
    let generateVoteList = (proposalId, addr) => {
      if (addr != 0) {
        Dao1901Votes.getVote(proposalId, addr)
          .then((vote) => {
            votes.push({voterAddr: addr, proposalId: proposalId, voteValue: vote[0]})
            addr = vote[1]
            generateVoteList(proposalId, addr)
          })
          .catch((e) => reject(e))
      } else {
        resolve(votes)
      }
    }
    fetchProposalByIndex(Dao1901Votes, proposalId)
      .then(({voterHead}) => {
        addr = voterHead
        generateVoteList(proposalId, addr)
    })
  })
}

/**
 * fetchAllVotesForAllProposals
 * @param Dao1901Votes
 * @returns {Promise}
 */
let fetchAllVotesForAllProposals = (Dao1901Votes) => {
  return new Promise((resolve, reject) => {
    let allVotes = {}
    Dao1901Votes.nProposals()
      .then(totalProposals => {
        let i = 1
        while (totalProposals >= i) {
          fetchAllVotesForAProposal(Dao1901Votes, i)
            .then((votesForOneProposal) => {
              if (votesForOneProposal.length !== 0) {
                allVotes[votesForOneProposal[0].proposalId] = votesForOneProposal
              }
            })
          i++
        }
        resolve(allVotes)
      })
      .catch((e) => reject(e))
  })
}
function* fetchAllVotesForAllProposalsWorker() {
  try {
    let Dao1901Votes = yield select(s => s.dao.contract.Dao1901Votes)
    const votes = yield call(fetchAllVotesForAllProposals, Dao1901Votes)
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_SUCCEED', votes: votes})
  } catch (e) {
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSAL_FAILED', error: e})
  }
}

/**
 * fetchAllProposals
 * @param Dao1901Votes
 * @returns {Promise}
 */
let fetchAllProposals = (Dao1901Votes) => {
  return new Promise((resolve, reject) => {
    let proposalListItems = []
    Dao1901Votes.nProposals()
      .then(n => {
        let totalProposals = n.valueOf()
        let proposalId = 1 // there is no proposal index 0
        let getAllProposalListItems = (proposalId) => {
          if (proposalId <= totalProposals) {
            fetchProposalByIndex(Dao1901Votes, proposalId)
              .then(({proposalDesc, proposalDeadline}) => {
                proposalListItems.push({proposalDesc, proposalDeadline})
                proposalId += 1
                getAllProposalListItems(proposalId)
              })
          } else {
            resolve(proposalListItems)
          }
        }
        getAllProposalListItems(proposalId)
      })
  })
}
function* fetchAllProposalsWorker() {
  try {
    let Dao1901Votes = yield select(s => s.dao.contract.Dao1901Votes)
    const proposals = yield call(fetchAllProposals, Dao1901Votes)
    yield put({type: 'FETCH_ALL_PROPOSALS_SUCCEED', proposals})
  } catch (e) {
    yield put({type: 'FETCH_ALL_PROPOSALS_FAILED', error: e})
  }
}

/**
 * Create Proposal
 * @param Dao1901Votes
 * @param proposalDesc
 * @param proposalDeadline
 * @returns {Promise}
 */
let createProposal = (Dao1901Votes, proposalDesc, proposalDeadline) => {
  return new Promise((resolve, reject) => {
    Dao1901Votes.createProposal.sendTransaction(proposalDesc, proposalDeadline)
      .then((tx) => {
        resolve(tx)
        console.log('TX createProposal successful. Tx Hash: ', tx)
        // Check if Tx is mined
        var setIntervalId = setInterval(() => web3.eth.getTransactionReceipt(tx, (err, receipt) => {
          if (err) reject(err.message)
          if (receipt) {
            console.log('Receipt Tx Dao1901Votes.createProposal: ', receipt)
            window.clearInterval(setIntervalId)
          }
        }), 2000)
      })
      .catch((err) => reject(err.message))
  })
}
function* createProposalWorker({values}) {
  try {
    const {proposalDescription, proposalDeadline} = values
    let Dao1901Votes = yield select(s => s.dao.contract.Dao1901Votes)
    yield call(createProposal, Dao1901Votes, proposalDescription, proposalDeadline)
    yield put({type: 'CREATE_PROPOSAL_SUCCEED'})
    yield put({type: 'FETCH_ALL_PROPOSALS_REQUESTED'})
  } catch (e) {
    yield put({type: 'CREATE_PROPOSAL_FAILED', e})
  }
}

export default function* vote() {
  yield takeEvery('CREATE_PROPOSAL_REQUESTED', createProposalWorker)
  yield takeEvery('VOTE_SUBMISSION_REQUESTED', onVoteSubmitWorker)
  yield takeEvery('FETCH_ALL_PROPOSALS_REQUESTED', fetchAllProposalsWorker)
  yield takeEvery('FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_REQUESTED', fetchAllVotesForAllProposalsWorker)
}


