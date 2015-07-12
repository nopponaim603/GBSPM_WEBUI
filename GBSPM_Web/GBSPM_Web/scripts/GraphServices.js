app.service('workItemsGraph', ['$q', function ($q) {
    var cy;
    var workItemsGraph = function (myGraph, $scope) {
        var workItem = myGraph.nodes;
        var edges = myGraph.edges;
        var deferred = $q.defer();

        // put people model in cy.js
        var eles = [];

        //////////////////////////////////////////////
        /////////////// push Node workItem ///////////
        for (var i = 0; i < workItem.length; i++) {
            eles.push({
                group: 'nodes',
                data: {
                    id: workItem[i].id,
                    name: workItem[i].name,
                    faveShape: workItem[i].faveShape,
                    faveColor: workItem[i].faveColor,
                    nodeType: workItem[i].nodeType,
                    workId:   workItem[i].workId,
                    isCritical: true,
                    "localization": "localization"
                }
            });
        }

        ////////////////////////////////////////////////////////
        /////////////// push edges  to link workItem ///////////
        for (var i = 0; i < edges.length; i++) {
            console.log(edges[i].source + " : " + edges[i].target)
            eles.push({
                group: 'edges',
                data: {
                    source: edges[i].source,
                    target: edges[i].target,
                    faveColor: edges[i].faveColor,
                    "idgroup": edges[i].source
                }
            });
        }
        /////////////////////////////////////////////////////

        $(function () { // on dom ready

            cy = cytoscape({
                container: $('#cy')[0],

                style: //cerebral_style
                cytoscape.stylesheet()
                  .selector('node')
                    .css({
                        'content': 'data(name)',
                        'shape': 'data(faveShape)',
                        'text-outline-color': 'data(faveColor)',
                        'background-color': 'data(faveColor)',
                        'text-valign': 'center',
                        'text-outline-width': 2,
                    })
                  .selector('edge')
                    .css({
                        'target-arrow-shape': 'triangle',
                        'line-color': 'data(faveColor)',
                        'source-arrow-color': 'data(faveColor)',
                        'target-arrow-color': 'data(faveColor)'
                    })
              ,

                layout: {
                    name: 'breadthfirst',
                    directed: true,
                    padding: 10,
                    rotation: 90
                },

                elements: eles,
                zoomingEnabled: false,
                fit: true,
                userPanningEnabled :false,
                ready: function () {
                    deferred.resolve(this);

                }
            });

            
            cy.cxtmenu({

                selector: 'node',

                commands: [
                    {
                        content: '<span class="fa fa-info fa-3x"></span>',
                        select: $scope.OnSelectedNodeInfo
                            
                    },

                    {
                        content: '<span class="fa fa-plus fa-3x"></span>',
                        select: $scope.OnSelectedNodeAdd
                    },

                    {
                        content: '<span class="fa fa-pencil fa-3x"></span>',
                        select: $scope.OnSelectedNodeEdit
                    },

                    {
                        content: '<span class="fa fa-warning fa-3x"></span>',
                        select: $scope.OnSelectedNodeDelete
                    }
                ]

            });

            
        }); // on dom ready

        return deferred.promise;
    };


    return workItemsGraph;
}]);