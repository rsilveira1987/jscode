function TableSorter(id) {
    this.table = $(id);
    this.direction = null;
    this.activeCollumn = null;

    // auto initialize
    this.init();
};

TableSorter.prototype.init = function() {
    var self = this;
    var thead = this.table.find('thead');
    thead.find('th.sortable').each(function(index,el){
        // create onclick event    
        $(el).on('click',function(){
            if (el == self.getActiveCollumn()) {
                self.toggleDirection();
            } else {
                self.setDirection('asc');
            }
            self.setActiveCollumn(el);
            self.sortCollumn(el.cellIndex);
        });
    });
};

TableSorter.prototype.setActiveCollumn = function(th) {
    this.clearActiveCollumn();
    this.activeCollumn = th;
    if (this.direction == 'asc') { $(th).addClass('asc'); }
    if (this.direction == 'desc') { $(th).addClass('desc'); }
    
};

TableSorter.prototype.clearActiveCollumn = function(th) {
    var thead = this.table.find('thead');
    // iterate THs
    thead.find('th').each(function(index,el){
        $(el).removeClass('asc');
        $(el).removeClass('desc');
    });
};

TableSorter.prototype.getActiveCollumn = function() {
    return this.activeCollumn;
};

TableSorter.prototype.sortCollumn = function(index) {
    // console.log('sorting collumn ' + index + ' in ' + this.direction + ' mode');
    var self = this;
    var tbody = this.table.find('tbody');
    var n = index+1; // css nth-child starts at 1

    tbody.find('tr').sort(function(a, b) {
        if (self.direction == 'asc') {
            return $('td:nth-child('+n+')', a).text().localeCompare($('td:nth-child('+n+')', b).text(),undefined, {numeric: true} );
        }
        else {
            return $('td:nth-child('+n+')', b).text().localeCompare($('td:nth-child('+n+')', a).text(), undefined, {numeric: true});
        }        
    }).appendTo(tbody);

};

TableSorter.prototype.setDirection = function(dir) {
    this.direction = dir;
};

TableSorter.prototype.toggleDirection = function() {
    this.direction = (this.direction == 'asc') ? 'desc' : 'asc';            
};