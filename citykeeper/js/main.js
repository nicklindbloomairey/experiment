"use strict";
//document.getElementById('text').innerHTML = "changed";

//CITYKEEPER
var Town = function(name, pop, gold) {
    this.buildings = [];

    var self = this;

    this.stats = {
        name: name,
        pop: pop,
        gold: gold,
        food: 0,
        get popLimit() {
            var popLimitTemp = 0;
            for (var i = 0; i<self.buildings.length; i++) {
                if (self.buildings[i] instanceof House) {
                    popLimitTemp += 4;
                }
            }
            return popLimitTemp;
        }
    }
}

Town.prototype.build = function(building) {
    this.stats.gold -= building.cost;
    this.buildings.push(building);
}

var Building = function(name, cost) {
    this.name = name;
    this.cost = cost;
}

var House = function() {
}

House.prototype = new Building("house", 40);


var Farm = function(size) {
    this.size = size;
    this.cost = size;
}

Farm.prototype = new Building("farm", 0);


Farm.prototype.harvest = function(town) {
    town.stats.food += this.size;
}

// (name, pop, gold)
var city = new Town("nicktown", 50, 2000);

for (var i = 0; i<25; i++) {
    city.build(new House());
}
city.build(new Farm(100));




function showStats() {
    var stats = document.getElementById('stats');

    if (stats.style.display == "block") {
        stats.style.display = "none";
        var list = stats.childNodes;
        console.log(list);
        for (var i = 0; i<list.length; i++ ) {
            stats.removeChild(list[i]);
            i--;
        }
        document.getElementById('showStatsButton').innerHTML = "Show Stats";
    } else {

        var statsList = document.createElement('ul');
        var title = document.createElement('h4');
        title.innerHTML = "Stats";
        statsList.appendChild(title);
        for (let stat in city.stats) {
            var item = document.createElement('li');
            var show = true;

            console.log(stat);

            if (stat == "pop") {
                item.innerHTML = stat + ": " + city.stats[stat] + "/" + city.stats.popLimit;
            } else if (stat == "buildings") {
                item.innerHTML = stat + ": "; 
                for (var i = 0; i<city.buildings.length; i++) {
                    console.log(city.buildings[i].name)
                    item.innerHTML = item.innerHTML + city.buildings[i].name + ", ";
                }
            } else if (stat == "popLimit") {
                //don't show population limit as a separate stat, it is shown next to pop
                show = false;
            } else {
                item.innerHTML = stat + ": " + city.stats[stat];
            }

            if (show) { statsList.appendChild(item);}
        }

        stats.appendChild(statsList);

        var buildingList = document.createElement('ul');
        
        var title = document.createElement('h4');
        title.innerHTML = "Buildings";
        buildingList.appendChild(title);
        //count the building types
        var buildingTypes = {
            house: 0,
            farm: 0,
            other: 0
        }
        for (let i in city.buildings) {
            console.log(city.buildings[i].name);

            //buildingTypes[city.buildings[i].name] += 1;
            //that was a faster way but it doesn't account for other

            if (city.buildings[i].name === "house") {
                buildingTypes.house += 1;
            } else if (city.buildings[i].name === "farm"){
                buildingTypes.farm += 1;
            } else {
                buildingTypes.other++;
            }
            
        }

        for (let property in buildingTypes) {
            var item = document.createElement('li');
            item.innerHTML = property + ": " + buildingTypes[property];
            buildingList.appendChild(item);
        }

        stats.appendChild(buildingList);


        stats.style.display = "block";
        document.getElementById('showStatsButton').innerHTML = "Hide Stats";
    }
}

function init() {
    var currentCity = document.getElementById('currentCity');

    currentCity.innerHTML = city.stats.name;
}

init();

