/* Priklad inputu 

@hra 1
AndrejM, Mino, Zuza, Ruby
Fero, Lucia, Viera, MartinH
Kreten, AndrejP, Rolo
Mon, Palo,Pupek, Iva

@hra 2
AndrejM, Mino, Zuza
Lucia, Mon,MartinH
Kreten, AndrejP, Rolo
Fero, Viera,  Palo
Pupek, Iva, Ruby

possible gotchas: 
- nerovnaky pocet mien v riadku -> f poho..?
- ciarka na konci riadku -> ??
- medzery uplne random
- meno cloveka obsahuje medzeru -> trim vsetky medzery ako prvy krok
- v jednej hre nemusi byt tolko ludi ako v druhej
- v prvej hre nemusia byt vsetci
- mena nebudu jedinecne -> smola

*/

//priklad pola, ktore vznikne parsovanim z inputu

var go2013 = [
	//Grupac
	[
		['Betka', 'DanoK', 'MisoM', 'MarekK', 'Andrej'],
		['Simonka', 'Filip', 'MarekM', 'Adam', 'Tima', 'Katka'],
		['Danka', 'DanoP', 'Lucka', 'MisoJ', 'Stano', 'Ondrej'],
		['Nika', 'Brano','Martin', 'MisoCh', 'Rachel', 'Viktor']
	],
	//Ekosystemy
	[
		['Danka', 'Nika', 'MisoM', 'DanoP'],
		['MisoCh', 'Tima', 'Ondrej', 'MarekM'],
		['MarekK', 'Simonka', 'Fresh', 'DanoP'],
		['Viktor', 'Katka', 'Andrej', 'Stano'],
		['Filip', 'Rachel', 'Adam', 'Martin'],
		['Betka', 'Lucka', 'MisoJ', 'Brano']
	],
	//Orva
	[
		['Danka', 'Stano', 'Viktor', 'Ondrej', 'Katka'],
		['DanoK', 'MisoCh', 'Simonka', 'Rachel', 'MarekM', 'Adam'],
		['Nika', 'MarekK', 'MisoJ', 'Tima', 'DanoP', 'MisoM'],
		['Lucka', 'Betka','Andrej', 'Filip', 'Martin', 'Brano']
	],
	//Obelisk Zin
	[
		['Nika', 'DanoK', 'MisoJ', 'Filip', 'Viktor', 'Lucka'],
		['MarekK', 'Betka', 'Danka', 'DanoP', 'Adam', 'Andrej', 'Stano'],
		['MisoCh', 'Adam', 'Martin', 'Ondrej', 'Tima', 'Simonka', 'MisoM']
	],
	//Paseraci
	[
		['Ondrej', 'Andrej', 'Lucka'],
		['Brano', 'Nika', 'MarekK', 'Viktor'],
		['Simonka', 'MisoM', 'Adam', 'Betka'],
		['DanoK', 'Tima', 'Katka', 'MisoJ'],
		['Filip', 'Rachel', 'DanoP', 'Martin'],
		['MarekM', 'Stano', 'Danka', 'MisoCh']
	],
	// vedomostna
	[
		['DanoP', 'Tima', 'Adam'],
		['Danka', 'Martin', 'Katka', 'Betka'],
		['Ondrej', 'Stano', 'Andrej', 'MarekM'],
		['Viktor', 'Lucka', 'MisoM', 'Simonka'],
		['MisoCh', 'Rachel', 'MisoJ', 'DanoK'],
		['MarekK', 'Nika', 'Filip', 'Brano']
	]
];

// var dummy = [
// 	[
// 		['AndrejM', 'Mino', 'Zuza', 'Ruby'],
// 		['Fero', 'Lucia', 'Viera', 'MartinH'],
// 		['Kreten', 'AndrejP', 'Rolo'],
// 		['Mon', 'Palo','Pupek', 'Iva']
// 	],
// 	[
// 		['AndrejM', 'Mino', 'Zuza'],
// 		['Lucia', 'Mon', 'MartinH'],
// 		['Kreten', 'AndrejP', 'Rolo'],
// 		['Fero', 'Viera', 'Palo'],
// 		['Pupek', 'Iva', 'Ruby']
// 	],
// 	[
// 		['Palo', 'Zuza', 'Lucia', 'Mon', 'MartinH'],
// 		['Mino', 'Kreten', 'AndrejP', 'Rolo'],
// 		['AndrejM', 'Fero', 'Viera', 'Pupek', 'Iva', 'Ruby']
// 	]
// ];

// var dummyActivities = ['Grupac', 'Ekosystemy'];
var ppl2013 = [
	'Adam', 
	'Andrej', 
	'Betka',
	'Brano', 
	'Danka',
	'Katka', 
	'Ondrej', 
	'Stano', 
	'MisoCh', 
	'MisoJ', 
	'MarekK', 
	'DanoK', 
	'Filip', 
	'Nika', 
	'MisoM', 
	'MarekM', 
	'Lucka', 
	'DanoP', 
	'Viktor', 
	'Martin', 
	'Rachel', 
	'Simonka', 
	'Tima', 
];


// load file - http://www.html5rocks.com/en/tutorials/file/dndfiles/
// parse file into object - napr http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
// iterate object
// render table - https://datatables.net/

//this puts it all together
var teamPicker = {
	names : [], //reference of unique names
	teamTable : {}, //this is out ultimate matrix of occurences
	htmlTableId : '#megatable',
	
	init : function() {
		//fileLoader.init();
		teamPicker._iterateArray(go2013);

		console.log('Naplneny objekt:');
		console.log(teamPicker.teamTable);

		teamPicker._getZeros(teamPicker.teamTable);

	},

	//this takes array of games and teams (TODO parsed from file)
	//returns matrix with names of players, their co-players and number of occurences
	_iterateArray : function(teamArray) {

		//inicializuj tabulku na nuly - pre kazde meno pridaj do objektu 
		// objekt = {
		// 	meno1 : {
		// 		meno2: 0,
		// 		meno3: 3,
		// 		meno4: 1
		// 	},
		// 	meno2 : {
		// 		meno1: 1,
		// 		meno3: 2
		// 	},
		// 	meno3 : {
		// 	}
		// };
		jQuery.each(ppl2013, function(iter, person1) {
			teamPicker.teamTable[person1] = {};
			jQuery.each(ppl2013, function(iter2, person2) {
				if (person1 !== person2) {
					teamPicker.teamTable[person1][person2] = 0;
				}
			});
		});

		console.log('Inicializovany objekt: ');
		console.log(teamPicker.teamTable);

		// now fill the object with real stuff
		jQuery.each(teamArray, function(i, game) {
			// console.log(i, game);
			jQuery.each(game, function(j, team) {
				// console.log(i, j, team);
				jQuery.each(team, function(k, player) {
					// console.log(i, j, k, player);
					
					//u kazdeho playera prejdi vsetkych spoluhracov v time a inkrementuj
					jQuery.each(team, function(l, coPlayer) {
						if(coPlayer != player) {
							//check if the player and coplayer exist (maybe somebody from organizers was in team - we drop this info)
							// TODO refactor
							if (jQuery.inArray(player, ppl2013) !== -1) {
								if (jQuery.inArray(coPlayer, ppl2013) !== -1) {
									teamPicker.teamTable[player][coPlayer]++;
								}
							} else {
								console.log(player + ' asi neexistuje');
							}
						}
					});


				}); //player each
			}); //team each
		}); //game each
	}, // iterateArray

	// return people that haven't played in one team so far
	_getZeros : function(teamTable) {
		jQuery.each(ppl2013, function(i, player) {
			console.log(player + ' este nebol/a v time s tymito ludmi: ');
			jQuery.each(ppl2013, function(j, coPlayer) {
				if(teamTable[player][coPlayer] == 0) {
					console.log(coPlayer);
				}
			});

		});
	}

}; //teamPicker

//handles (local) file upload
var fileLoader = {
	config : {
		varname : 'varvalue'
	},
	init : function() {
		console.log(dummy);

	},
	readFile : function() {

	}
}; //fileLoader

var frontEnd = {
	newTeam : [],

	init : function() {

		// var newTeam = [];

		//fill the first list with names from array
		$.each(ppl2013, function(i, player) {
			$('.peoplelist').append('<li>' + player +'</li>');
		});

		// init sortables
		$('.peoplelist, .teamlist').sortable({
			connectWith : '.connect',
			placeholder: 'my-placeholder'
		});

		//on persist make team array out of lists
		frontEnd._saveTeams();


	},

	//fills array of teams and players
	_makeArray : function() {

		var that = this;

		$teamlists = $('.teamlist');
		$.each($teamlists, function(i, listt) {
			var listtItems = $(listt).find('li');
			that.newTeam[i] = [];
			$.each(listtItems, function(j, item) {
				that.newTeam[i][j] = $(item).html()
			})
		});

	},

	//saves to Local Storage
	_saveTeams : function() {
		var that = this;


		$('#persist').on('click', function(){
			console.log(that);
			that._makeArray();

			var arrayToSave = JSON.stringify(that.newTeam);
			console.log(arrayToSave);
			localStorage.setItem( 'newTeam', arrayToSave );
			console.log( JSON.parse( localStorage.getItem( 'newTeam' ) ) );
		});

	}, //saveTeams

	_supportsStorage : function() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	} //supportsStorage
}; //frontEnd


$(document).ready(function() {
	teamPicker.init();
	frontEnd.init();
});