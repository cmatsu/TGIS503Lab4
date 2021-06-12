//sidebar menu
$("#accordion > li").click(function(){

	if(false == $(this).next().is(':visible')) {
		$('#accordion > ul').slideUp(300);
	}
	$(this).next().slideToggle(300);
});

	mapboxgl.accessToken = 'pk.eyJ1IjoiY21hdHN1IiwiYSI6ImNraGNuNmw0YzAxajIyeXA1ZWE4aG80NDcifQ.3Y8_bQTBQeuNtqFL3OMBVw';
	var rsecimap = new mapboxgl.Map({
		container: 'rsecimap', // HTML container id
		style: 'mapbox://styles/cmatsu/ckhvwl4j90qqu19p2cypdhwso', // style URL
		center: [-122.283610, 47.613219], // starting position as [lng, lat]
		zoom: 9.5, // starting zoom
		minzoom: 9.5,
		maxZoom: 13
	});
	rsecimap.setMaxBounds([[-122.5615102753933,47.49292476159579],[-121.97748153180596,47.73685399242751]]);
	rsecimap.on('load', function() {
		//create a legend
		var layers = ['<strong>Composite Index</strong>', '', 'Least Disadvantaged',  'Less Disadvantaged', 'Median', 'More Disadvantaged', 'Most Disadvantaged'];
		var colors = ['', '', '#fbdea7', '#ffc533', '#f6a637', '#f28831', '#d1631a'];

		for (i = 0; i < layers.length; i++) {
				var layer = layers[i];
				var color = colors[i];
				var item = document.createElement('div');
				var key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;

				var value = document.createElement('span');
				value.innerHTML = layer;
				item.appendChild(key);
				item.appendChild(value);
				rsecilegend.appendChild(item);
		}

		//hover over census tracts to get more info
		rsecimap.on('mousemove', function(e) {
			var tracts = rsecimap.queryRenderedFeatures(e.point, {
				layers: ['rseci']
			});

			if (tracts.length > 0) {
				document.getElementById('getrseci').innerHTML = '<p></p><h5><b>' + tracts[0].properties.NAMELSAD10 + '</b></h5><h6>Health Disadvantage:</h6><h5> ' + tracts[0].properties.HEALTH_QUINTILE +
				'</h5><h6>Race/ELL/Origins:</h6><h5> ' + tracts[0].properties.RACE_ELL_ORIGINS_QUINTILE +
				'</h5><h6>Socioeconomic Disadvantage:</h6><h5> ' + tracts[0].properties.SOCIOECONOMIC_QUINTILE + '</h5>';
				$('#rsecifeatures').css('height', '210px');
			} else {
				document.getElementById('getrseci').innerHTML = '<br><br><h5>Hover over a census tract for more info</h5>';
				$('#rsecifeatures').css('height', '120px');
			}
		});
	});

	var incomemap = new mapboxgl.Map({
		container: 'incomemap', // HTML container id
		style: 'mapbox://styles/cmatsu/ckigpxynn0nid19mgb9dt6fwl', // style URL
		center: [-122.283610, 47.613219], // starting position as [lng, lat]
		zoom: 9.5, // starting zoom
		minzoom: 9.5,
		maxZoom: 13
	});
	incomemap.setMaxBounds([[-122.5615102753933,47.49292476159579],[-121.97748153180596,47.73685399242751]]);
	incomemap.on('load', function() {
		//create a legend for income
		var inclyr = ['<strong>Household Income ($)</strong>', '', '&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;10521', '', '', '', '', '&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;168425'];
		var colors = ['', '', '', '', '', '', '', ''];
		for (i = 0; i < inclyr.length; i++) {
				var layer = inclyr[i];
				var color = colors[i];
				var item = document.createElement('div');
				var key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;
				var value = document.createElement('span');
				value.innerHTML = layer;
				item.appendChild(key);
				item.appendChild(value);
				incomelegend.appendChild(item);
		}
		//create a legend for poverty
		var layers = ['<strong>Population in Poverty (%)</strong>', '', '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1.3', '', '', '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;30', '', '', '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;58.7'];
		var color2 = ['', '', '', '', '', '', '','',  ''];
		for (i = 0; i < layers.length; i++) {
				var layer = layers[i];
				var color = color2[i];
				var item = document.createElement('div');
				var key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;
				var value = document.createElement('span');
				value.innerHTML = layer;
				item.appendChild(key);
				item.appendChild(value);
				povertylegend.appendChild(item);
		}


		//hover over census tracts to get more info
		incomemap.on('mousemove', function(e) {
			var tracts = incomemap.queryRenderedFeatures(e.point, {
				layers: ['medinc']
			});
			var povlvls = incomemap.queryRenderedFeatures(e.point, {
				layers: ['povlvl']
			});
			var x = document.getElementById('toggle').querySelectorAll('a.active');
			if(x[0].innerHTML == 'Household Income') {
				$('#incomebar').css('background','linear-gradient(to bottom, #fffffa 6.2%, #e8fdbf 26.3%, #a6c468 46.4%, #5e7b23 72.8%, #374e09 99.1%)');
				$('#incomelegend').show();
				$('#povertylegend').hide();
			} else {
				$('#incomebar').css('background','linear-gradient(to bottom, #faeb9e, #e34326 50%, #774304)');
				$('#povertylegend').show();
				$('#incomelegend').hide();
			}
			if (tracts.length > 0) {
				document.getElementById('getincome').innerHTML = '<br><h5><b>' + tracts[0].properties.NAMELSAD10 + '</b></h5><h5><b>Median Household Income:</b> $' + tracts[0].properties.MEDIAN_HH_INC_PAST_12MO_DOLLAR + '</h5>';
				var tier1 = tracts[0].properties.HH_INCOME_LESS_THAN_10_000;
				var tier2 = tracts[0].properties.HH_INCOME_10_000_TO_14_999;
				var tier3 = tracts[0].properties.HH_INCOME_15_000_TO_24_999;
				var tier4 = tracts[0].properties.HH_INCOME_25_000_TO_34_999;
				var tier5 = tracts[0].properties.HH_INCOME_35_000_TO_49_999;
				var tier6 = tracts[0].properties.HH_INCOME_50_000_TO_74_999;
				var tier7 = tracts[0].properties.HH_INCOME_75_000_TO_99_999;
				var tier8 = tracts[0].properties.HH_INCOME_100_000_TO_149_999;
				var tier9 = tracts[0].properties.HH_INCOME_150_000_TO_199_999;
				var tier10 = tracts[0].properties.HH_INCOME_200_000_OR_MORE;
				new Chart(document.getElementById("incomechart"), {
					type: 'bar',
					data: {
						labels: ["< 10,000", "10,000 - 14,999", "15,000 - 24,999",
						"25,000 - 34,999", "35,000 - 49,999", "50,000 - 74,999", "75,000 - 99,999",
						"100,000 - 149,999","150,000 - 199,999","> 200,000"],
						datasets: [
							{
								label: "Income ($)",
								data: [tier1, tier2, tier3, tier4, tier5, tier6, tier7, tier8, tier9, tier10]
							}
						]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						legend: {
							display: false
						},
						title: {
							display: true,
							text: 'Population per Household Income Level'
						},
						plugins: {
							colorschemes: {
								scheme: 'brewer.Accent8'
							}
						},
						scales: {
							xAxes: [{
									ticks: {
											autoSkip: false,
											maxRotation: 90,
											minRotation: 90
									}
							}]
						}
					}
			});
				$('#incomechart').show();
				$('#incomefeatures').css('height', '330px');
			} else if (povlvls.length > 0) {
				document.getElementById('getincome').innerHTML = '<br><h5><b>'
				+ povlvls[0].properties.NAMELSAD10 + '</b></h5><h5><b>% of Population in Poverty: </b>'
				+ povlvls[0].properties.PCT_POPULATION_UNDER_POVERTY + '</h5><h5><b>% of Families in Poverty: </b>'
				+ povlvls[0].properties.PCT_ALL_FAMILY_UNDER_POVERTY  + '</h5><h5><b>% of Pop. Below 200% Poverty: </b>'
				+ povlvls[0].properties.PCT_POP_200_PCT_BELOW_POVERTY  + '</h5><h5><b>Recognized Pop. in Poverty: </b>'
				+ povlvls[0].properties.POP_POVERTY_STATUS_DETERMINED + '';
				$('#incomechart').hide();
				$('#incomefeatures').css('height', '170px');
			} else {
				document.getElementById('getincome').innerHTML = '<br><br><h5>Hover over a census tract for more info</h5>';
				$('#incomechart').hide();
				$('#incomefeatures').css('height', '120px');
			}
		});
	});

	var racemap = new mapboxgl.Map({
		container: 'racemap', // HTML container id
		style: 'mapbox://styles/cmatsu/ckif7cml04cfq19mlca8hyzqe', // style URL
		center: [-122.283610, 47.613219], // starting position as [lng, lat]
		zoom: 9.5, // starting zoom
		minzoom: 9.5,
		maxZoom: 13
	});
	racemap.setMaxBounds([[-122.5615102753933,47.49292476159579],[-121.97748153180596,47.73685399242751]]);
	racemap.on('load', function() {
		//create a legend
		var layers = ['<strong>POC Population (%)</strong>', '', '&emsp;&emsp;&emsp;&emsp;&ensp;10.9', '', '', '', '', '&emsp;&emsp;&emsp;&emsp;&ensp;92.2'];
		var colors = ['', '', '', '', '', '', '', ''];
		for (i = 0; i < layers.length; i++) {
				var layer = layers[i];
				var color = colors[i];
				var item = document.createElement('div');
				var key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;

				var value = document.createElement('span');
				value.innerHTML = layer;
				item.appendChild(key);
				item.appendChild(value);
				racelegend.appendChild(item);
		}

		//hover over census tracts to get more info
		racemap.on('mousemove', function(e) {
			var tracts = racemap.queryRenderedFeatures(e.point, {
				layers: ['pctpoc']
			});
			if (tracts.length > 0) {
				document.getElementById('getrace').innerHTML = '<br><h5><b>' + tracts[0].properties.NAMELSAD10 + '</b><h5><b>% of Population that are POC:</b> ' + tracts[0].properties.PCT_PERSON_OF_COLOR + '</h5>';
				var white = tracts[0].properties.NOT_HISPANIC_LATINO_WHITE_ONE;
				var black = tracts[0].properties.NOTHISPLATINO_BLKAFRCNAMER_ONE;
				var native = tracts[0].properties.NOTHISPLATINO_AMINDALSKNTV_ONE;
				var asian = tracts[0].properties.NOTHISPLATINO_ASIAN_ONE;
				var pacific = tracts[0].properties.NOTHISPLATINO_NHAWAIIOTHPI_ONE;
				var hispanic = tracts[0].properties.HISPANIC_OR_LATINO_OF_ANY_RACE;
				var mixed = tracts[0].properties.NOTHISPLATINO_TWO_OR_MORE_RACE;
				var other = tracts[0].properties.NOTHISPLATINO_SOME_OTHER_ONE;
				new Chart(document.getElementById("racechart"), {
					type: 'doughnut',
					data: {
						labels: ["White", "Black", "Native", "Asian", "Pacific Islander", "Hispanic/Latino", "Mixed Race", "Other"],
						datasets: [
							{
								label: "Population",
								data: [white, black, native, asian, pacific, hispanic, mixed, other]
							}
						]
					},
					options: {
						responsive: true,
						legend: {
							display: true,
							position: 'bottom'
						},
						plugins: {
							colorschemes: {
								scheme: 'tableau.ClassicCyclic13'
							}
						}
					}
			});
				$('#racechart').show();
				$('#racefeatures').css('height', '320px');
			} else {

				document.getElementById('getrace').innerHTML = '<br><br><h5>Hover over a census tract for more info</h5>';
				$('#racechart').hide();
				$('#racefeatures').css('height', '120px');
			}
		});
	});

	// enumerate ids of the layers
		var toggleableLayerIds = ['medinc', 'povlvl'];
		var layerNames = ['Household Income', 'Poverty Level'];
		var toggleSwitch = false;
			// set up the corresponding toggle button for each layer
			for (var i = 0; i < toggleableLayerIds.length; i++) {
					var id = toggleableLayerIds[i];

					var link = document.createElement('a');
					link.href = '#';
					if (id == 'medinc') {
						link.className = 'active';
					} else {
						link.className = '';
					}
					link.textContent = layerNames[i];
					link.value = id;

					link.onclick = function(e) {
							var clickedLayer = this.value;
							e.preventDefault();
							e.stopPropagation();
							for (var j = 0; j < toggleableLayerIds.length; j++) {
									if (clickedLayer === toggleableLayerIds[j]) {
										layers.children[j].className = 'active';
										incomemap.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'visible');

									}
									else {
										layers.children[j].className = '';
										incomemap.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'none');
									}
							}
					};
					var layers = document.getElementById('toggle');
					layers.appendChild(link);
			}
