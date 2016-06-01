HTMLWidgets.widget({

  name: "dalliancR",

  type: "output",

  initialize: function (el, width, height) {
    return{};
  },

  renderValue: function (el, x, instance) {
    //Create HTML div to place the browser:
    var div = document.createElement("div");
    div.id = "dalliancer";
    document.body.appendChild(div);
    
    //Get gene name:
    var gene = x.gene;
    
    //Get dataset:
    var data = x.dataset;
    
    //Create sources object:
    var defaultSources = [{name: 'Genome',
                     twoBitURI:  'http://www.biodalliance.org/datasets/GRCm38/mm10.2bit',
                     desc: 'Mouse reference genome build GRCm38',
                     tier_type: 'sequence',
                     provides_entrypoints: true}
                      ,{name: 'Genes',
                        desc: 'Gene structures from GENCODE M2',
                        bwgURI: 'http://www.biodalliance.org/datasets/GRCm38/gencodeM2.bb',
                        stylesheet_uri: 'http://www.biodalliance.org/stylesheets/gencode.xml',
                        collapseSuperGroups: true,
                        trixURI: 'http://www.biodalliance.org/datasets/GRCm38/gencodeM2.ix'}
                      ];
      
      if (data == undefined){
        sources = defaultSources;
      } else {
        sources = defaultSources.concat(data);  
      }

    // Create a genome browser with dalliance.js

   b = new Browser({
     pageName: "dalliancer",
      chr:        '19',
      viewStart:  30000000,
      viewEnd:    30100000,
      cookieKey:  'mouse38',
      coordSystem: {
          speciesName: 'Mouse',
          taxon: 10090,
          auth: 'GRCm',
          version: 38,
          ucscName: 'mm10'
      },
      chains: {
      mm9ToMm10: new Chainset('http://www.derkholm.net:8080/das/mm9ToMm10/', 'NCBIM37', 'GRCm38',
                               {
                                  speciesName: 'Mouse',
                                  taxon: 10090,
                                  auth: 'NCBIM',
                                  version: 37,
                                  ucscName: 'mm9'
                               })
    }, 

//colours from colorbrewer2.org, sequential multi-hue, 9 categories, red/orange- last one in bottom row: 
      sources:      sources,
      fullScreen: true,
      noPersist:  true
});
    setTimeout(function() {
    b.search(gene, function(err) {
        if (err) 
           console.log('Error in gene search: ' + err);
    });
}, 2000);
  b.clearHighlights();
  }
  


});