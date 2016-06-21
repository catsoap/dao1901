// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_secretary","type":"address"},{"name":"_president","type":"address"},{"name":"_treasurer","type":"address"}],"name":"setBureau","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_payed","type":"bool"},{"name":"_vote","type":"bool"}],"name":"createMember","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberId","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"memberSince","type":"uint256"},{"name":"payed","type":"bool"},{"name":"canVote","type":"bool"},{"name":"role","type":"uint8"},{"name":"public_key","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getMemberRole","outputs":[{"name":"role","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getMemberPayed","outputs":[{"name":"status","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getMemberCanVote","outputs":[{"name":"status","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getMemberSince","outputs":[{"name":"memberSince","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getMemberAdresse","outputs":[{"name":"addr","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"getMembersLength","outputs":[{"name":"size","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "6060604052600080546002810180835591908290801582901161005c5760020281600202836000526020600020918201910161005c91905b808211156101a857848155600181018054600160b860020a0319169055600201610037565b5050610100604052426060908152608082905260a0829052600460c05260e08290528154909250819081101561000257508054818052427f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5638190557f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e564805462ffffff19166204000017630100000060b860020a03191690556101a06040526101009081526101208390526101408390526101608390523361018052925060019081101561000257427f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e565557f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5668054600160b860020a03191663010000003390810291909117909155600160a060020a0316825260208190526040822055610988915081906101ac90396000f35b509056606060405236156100825760e060020a60003504631b6b865681146100845780632ddb59da146100f0578063391068211461015d5780635daf08ca1461017557806369639749146101ef5780637c987ba414610289578063879b18b6146102d6578063c1a2babc14610327578063fadda20814610382578063fc53c821146103c7575b005b61008260043560243560443533600160a060020a03166000908152600160205260408120548114806100e65750604081205481548291829181101561000257908052600202600080516020610968833981519152015462010000900460ff1614155b156104b057610002565b6100826004356024356044355b33600160a060020a0316600090815260016020526040812054811480610153575060408120548154600491839181101561000257908052600202600080516020610968833981519152015462010000900460ff16145b156105e257610002565b6103cb60043560016020526000908152604090205481565b6103dd600435600080548290811015610002575080526002026000805160206109688339815191528101547f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563909101549060ff818116916101008104821691620100008204169063010000009004600160a060020a031685565b61041160043560408051602081810183526000808352600160a060020a0385168152600190915291822054825491929182919081101561000257908052600202600080516020610968833981519152015462010000900460ff16141561074d575060408051808201909152600881527f466f756e6465727300000000000000000000000000000000000000000000000060208201526102d1565b61047f600435600160a060020a038116600090815260016020526040812054815482919081101561000257908052600202600080516020610968833981519152015460ff1690505b919050565b61047f600435600160a060020a0381166000908152600160205260408120548154829190811015610002579080526002026000805160206109688339815191520154610100900460ff1690506102d1565b6103cb600435600160a060020a0381166000908152600160205260408120548154829190811015610002579080526002027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563015490506102d1565b61049360043560006000600050828154811015610002575050805260028102600080516020610968833981519152015463010000009004600160a060020a03166102d1565b6000545b60408051918252519081900360200190f35b604080519586529315156020860152911515848401526060840152600160a060020a03166080830152519081900360a00190f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104715780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b604080519115158252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60025460ff161515600114156104c557610002565b6104d284600160016100fd565b600160a060020a038416600090815260016020819052604082205482549192918110156100025790805260020260008051602061096883398151915201805462ff000019166201000017905561052a908490806100fd565b600160a060020a0383166000908152600160205260408120548154600292919081101561000257908052026000805160206109688339815191520180546202000062ff000019909116179055610582826001806100fd565b600160a060020a0382166000908152600160205260408120548154600392919081101561000257908052600290810260008051602061096883398151915201805462ff0000191662030000179055805460ff191660011790555050505050565b5060008054600160a060020a038516825260016020819052604083208290558101808355909182918280158290116106655760020281600202836000526020600020918201910161066591905b80821115610749576000815560018101805476ffffffffffffffffffffffffffffffffffffffffffffff1916905560020161062f565b5050505060a060405190810160405280428152602001848152602001838152602001600481526020018581526020015060006000508281548110156100025750808052600283027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630190508151815560208201516001919091018054604084015160608501516080959095015163010000000276ffffffffffffffffffffffffffffffffffffffff00000019620100009690960262ff0000196101009390930261ff001960ff19909516909617939093169490941716179290921617905550505050565b5090565b600160a060020a0382166000908152600160208190526040822054825491929181101561000257908052600202600080516020610968833981519152015462010000900460ff1614156107d4575060408051808201909152600a81527f536563726561746172790000000000000000000000000000000000000000000060208201526102d1565b600160a060020a03821660009081526001602052604081205481546002929190811015610002579080528102600080516020610968833981519152015462010000900460ff16141561085a575060408051808201909152600981527f507265736964656e74000000000000000000000000000000000000000000000060208201526102d1565b600160a060020a0382166000908152600160205260408120548154600392919081101561000257908052600202600080516020610968833981519152015462010000900460ff1614156108e1575060408051808201909152600981527f547265617375726572000000000000000000000000000000000000000000000060208201526102d1565b600160a060020a0382166000908152600160205260408120548154600492919081101561000257908052600202600080516020610968833981519152015462010000900460ff1614156102d1575060408051808201909152600781527f4d656d626572730000000000000000000000000000000000000000000000000060208201526102d156290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e564",
    unlinked_binary: "6060604052600080546002810180835591908290801582901161005c5760020281600202836000526020600020918201910161005c91905b808211156101a857848155600181018054600160b860020a0319169055600201610037565b5050610100604052426060908152608082905260a0829052600460c05260e08290528154909250819081101561000257508054818052427f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5638190557f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e564805462ffffff19166204000017630100000060b860020a03191690556101a06040526101009081526101208390526101408390526101608390523361018052925060019081101561000257427f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e565557f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5668054600160b860020a03191663010000003390810291909117909155600160a060020a0316825260208190526040822055610988915081906101ac90396000f35b509056606060405236156100825760e060020a60003504631b6b865681146100845780632ddb59da146100f0578063391068211461015d5780635daf08ca1461017557806369639749146101ef5780637c987ba414610289578063879b18b6146102d6578063c1a2babc14610327578063fadda20814610382578063fc53c821146103c7575b005b61008260043560243560443533600160a060020a03166000908152600160205260408120548114806100e65750604081205481548291829181101561000257908052600202600080516020610968833981519152015462010000900460ff1614155b156104b057610002565b6100826004356024356044355b33600160a060020a0316600090815260016020526040812054811480610153575060408120548154600491839181101561000257908052600202600080516020610968833981519152015462010000900460ff16145b156105e257610002565b6103cb60043560016020526000908152604090205481565b6103dd600435600080548290811015610002575080526002026000805160206109688339815191528101547f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563909101549060ff818116916101008104821691620100008204169063010000009004600160a060020a031685565b61041160043560408051602081810183526000808352600160a060020a0385168152600190915291822054825491929182919081101561000257908052600202600080516020610968833981519152015462010000900460ff16141561074d575060408051808201909152600881527f466f756e6465727300000000000000000000000000000000000000000000000060208201526102d1565b61047f600435600160a060020a038116600090815260016020526040812054815482919081101561000257908052600202600080516020610968833981519152015460ff1690505b919050565b61047f600435600160a060020a0381166000908152600160205260408120548154829190811015610002579080526002026000805160206109688339815191520154610100900460ff1690506102d1565b6103cb600435600160a060020a0381166000908152600160205260408120548154829190811015610002579080526002027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563015490506102d1565b61049360043560006000600050828154811015610002575050805260028102600080516020610968833981519152015463010000009004600160a060020a03166102d1565b6000545b60408051918252519081900360200190f35b604080519586529315156020860152911515848401526060840152600160a060020a03166080830152519081900360a00190f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104715780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b604080519115158252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60025460ff161515600114156104c557610002565b6104d284600160016100fd565b600160a060020a038416600090815260016020819052604082205482549192918110156100025790805260020260008051602061096883398151915201805462ff000019166201000017905561052a908490806100fd565b600160a060020a0383166000908152600160205260408120548154600292919081101561000257908052026000805160206109688339815191520180546202000062ff000019909116179055610582826001806100fd565b600160a060020a0382166000908152600160205260408120548154600392919081101561000257908052600290810260008051602061096883398151915201805462ff0000191662030000179055805460ff191660011790555050505050565b5060008054600160a060020a038516825260016020819052604083208290558101808355909182918280158290116106655760020281600202836000526020600020918201910161066591905b80821115610749576000815560018101805476ffffffffffffffffffffffffffffffffffffffffffffff1916905560020161062f565b5050505060a060405190810160405280428152602001848152602001838152602001600481526020018581526020015060006000508281548110156100025750808052600283027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630190508151815560208201516001919091018054604084015160608501516080959095015163010000000276ffffffffffffffffffffffffffffffffffffffff00000019620100009690960262ff0000196101009390930261ff001960ff19909516909617939093169490941716179290921617905550505050565b5090565b600160a060020a0382166000908152600160208190526040822054825491929181101561000257908052600202600080516020610968833981519152015462010000900460ff1614156107d4575060408051808201909152600a81527f536563726561746172790000000000000000000000000000000000000000000060208201526102d1565b600160a060020a03821660009081526001602052604081205481546002929190811015610002579080528102600080516020610968833981519152015462010000900460ff16141561085a575060408051808201909152600981527f507265736964656e74000000000000000000000000000000000000000000000060208201526102d1565b600160a060020a0382166000908152600160205260408120548154600392919081101561000257908052600202600080516020610968833981519152015462010000900460ff1614156108e1575060408051808201909152600981527f547265617375726572000000000000000000000000000000000000000000000060208201526102d1565b600160a060020a0382166000908152600160205260408120548154600492919081101561000257908052600202600080516020610968833981519152015462010000900460ff1614156102d1575060408051808201909152600781527f4d656d626572730000000000000000000000000000000000000000000000000060208201526102d156290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e564",
    address: "0xeb6e06922ab69939e422572995fff47351099d42",
    generated_with: "2.0.9",
    contract_name: "Dao1901"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Dao1901 = Contract;
  }

})();