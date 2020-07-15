var web3 = new Web3("HTTP://192.168.0.15:7545");
var address ="0xB0309036f2036Db0a8a8615fA2B474F15AD1F1Fc";
var abi = [
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_dno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_violation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_enno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_due",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_payment",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_penalty",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "_status1",
				"type": "string"
			}
		],
		"name": "addEntry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_vno",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_penalty",
				"type": "int256"
			}
		],
		"name": "payment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_dno",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_vno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			}
		],
		"name": "tracking",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_index",
				"type": "int256"
			}
		],
		"name": "getdata",
		"outputs": [
			{
				"internalType": "int256",
				"name": "enno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "violation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_index",
				"type": "int256"
			}
		],
		"name": "getddata",
		"outputs": [
			{
				"internalType": "int256",
				"name": "enno",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "dno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "violation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "locantion",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getlength",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_enno",
				"type": "int256"
			}
		],
		"name": "getnumoff",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_enno",
				"type": "int256"
			}
		],
		"name": "getnumvio",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_index",
				"type": "int256"
			}
		],
		"name": "getpdata",
		"outputs": [
			{
				"internalType": "int256",
				"name": "enno",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "dno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "violation",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_index",
				"type": "int256"
			}
		],
		"name": "getppdata",
		"outputs": [
			{
				"internalType": "string",
				"name": "due",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "payment",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "penalty",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "statusl",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "vno",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"name": "myMapping",
		"outputs": [
			{
				"internalType": "int256",
				"name": "vno",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "dno",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "violation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "enno",
				"type": "int256"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"name": "myMapping1",
		"outputs": [
			{
				"internalType": "string",
				"name": "due",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "payment",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "penalty",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "statusl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];