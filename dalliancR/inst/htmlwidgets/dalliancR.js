HTMLWidgets.widget({

  name: "dalliancR",

  type: "output",

  factory: function(el,width, height) {
  
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
                        ,{name: 'Illingworth CpG',
                          desc: 'Illingworth CpG Ilsands lifted over to mm10',
                          bwgURI: 'http://ftp2.babraham.ac.uk/ftpusr52/Illingworth_CpG.mm10.bigbed'
                        }
                      ];
    var b = new Browser({
     pageName: "dalliance",
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

      sources:      defaultSources,
      maxHeight: 1000,
      noPersist:  true,
});
    return{
    renderValue: function (opts) {

      //Get gene name:
      var gene = opts.gene;

      //Get dataset:
      var data = opts.dataset;
      
      var existingTrackNames = [];
      Object.keys(b.tiers).forEach(function(key){
        var val = b.tiers[key]["dasSource"]["name"];
        existingTrackNames.push(val);
      });
      
      if (data == undefined){
    //    do nothing until user selects data
        } else {
      
      //  Add tracks handed to browser iteratively, but first check they aren't already there:
      
          for (var i=0 ; i<data.length; i++) {
            //console.log(existingTrackNames.includes(data[i].name));
            if (!existingTrackNames.includes(data[i].name)){
              b.addTier({
                name: data[i].name,
                desc: data[i].desc,
                bwgURI: data[i].bwgURI,
                style: data[i].style,
              });
            }
          }
        };
      b.clearHighlights();
 
//    setTimeout(function() {
//    b.search(gene, function(err) {
//        if (err)
//           console.log('Error in gene search: ' + err);
//    });
//    b.clearHighlights();
//}, 3500);
  },
//  resize: function(width, height) {
        
        // forward resize on to sigma renderers
//        for (var name in b.renderers)
//          b.renderers[name].resize(width, height);  
//      },
};
}

});
