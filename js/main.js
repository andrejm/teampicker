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
		['Lucia', 'Betka','Andrej', 'Filip', 'Martin', 'Brano']
	],
	//Obelisk Zin
	[
		['Nika', 'DanoK', 'MisoJ', 'Filip', 'Viktor', 'Lucia'],
		['MarekK', 'Betka', 'Danka', 'DanoP', 'Adam', 'Andrej', 'Stano'],
		['MichalCh', 'Adam', 'Martin', 'Ondrej', 'Tima', 'Simonka', 'MisoM']
	],
	//Paseraci
	[
		['Ondrej', 'Andrej', 'Lucia'],
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
		['MisoCh', 'Rachel', 'MisoJ', 'Dano'],
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
var ppl2013 = ['Katka', 'Ondrej', 'Rachel', 'Stano', 'Tima', 'Andrej', 'MisoCh', 'MisoJ', 
				'MarekK', 'DanoK', 'Adam', 'Filip', 'Nika', 'MisoM', 'MarekM', 'Danka',
				'Lucka', 'DanoP', 'Viktor', 'Martin', 'Brano', 'Simonka', 'Betka'];


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
		// teamPicker.iterateArray(dummy);
		teamPicker.iterateArray(go2013);

		console.log('Na akcii je tychto ' + teamPicker.names.length + ' ludi: ');
		// console.log(teamPicker.names);
		console.log(teamPicker.teamTable);

		jQuery.each(ppl2013, function(i, row) {
			console.log('>>>' + row);
			// console.log(teamPicker.teamTable[row]);

			jQuery('#show').append('<div class="col col-' + row + '">');
			jQuery('.col-' + row).append('<h3>' + row + '<br>&darr;</h3>');

			jQuery.each(ppl2013, function(j, row2) {
				console.log(row2);
				jQuery('.col-' + row).append(row2 + ' - ');
				if (teamPicker.teamTable[row][row2] === undefined) {
					console.log(0);
					jQuery('.col-' + row).append('0');
				} else {
					console.log(teamPicker.teamTable[row][row2]);
					jQuery('.col-' + row).append(teamPicker.teamTable[row][row2]);
				}
				jQuery('.col-' + row).append('<br>');

			});

			jQuery('#show').append('</div> <!-- .col -->');

		});

		// console.log(renderTable.renderHead(teamPicker.teamTable));
		
		//renderTable.renderHead(teamPicker.teamTable).appendTo(jQuery(teamPicker.htmlTableId));
	},

	//this takes array parsed from file
	//returns matrix with names of players, their co-players and number of occurences 
	iterateArray : function(teamArray) {
		jQuery.each(teamArray, function(i, game) {
			// console.log(i, game);
			jQuery.each(game, function(j, team) {
				// console.log(i, j, team);
				jQuery.each(team, function(k, player) {
					// console.log(i, j, k, player);
					
					//pridaj cloveka do zoznamu, ak tam uz nie je
					if (jQuery.inArray(player, teamPicker.names) == -1) {
						teamPicker.names[teamPicker.names.length] = player;
						teamPicker.teamTable[player] = {};
					}

					//u kazdeho playera prejdi vsetkych spoluhracov v time a inkrementuj
					jQuery.each(team, function(l, coPlayer) {
						if(coPlayer != player) {
							//ak existuje, inkrementuj, ak nie, inicializuj na jednotku
							if (teamPicker.teamTable[player].hasOwnProperty(coPlayer)) {
								teamPicker.teamTable[player][coPlayer]++;
							} else {
								teamPicker.teamTable[player][coPlayer] = 1;
							}
						}
					});


				}); //player each
			}); //team each
		}); //game each
	} // iterateArray

}; //teamPicker

var renderTable = {
	// pridavat classy podla mien
	
	renderHead : function(teamTable) {
		var $head = jQuery('<tr/>');
		
		jQuery.each(teamTable, function(index, element) {
			jQuery('<th>'+index+'</th>').appendTo($head);
		});

		return $head;
	},

	renderBody : function() {
		//table musim renderovat po riadkoch (?)
		//prejst kazdu prvourovnovu property objektu

	}
};


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



$(document).ready(function() {
	teamPicker.init();
});