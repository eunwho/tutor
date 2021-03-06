var sidebar = require('../helpers/sidebar');

module.exports = {
	index : function(req, res) {
		var viewModel ={
			images: [
				{
					uniqueId: 1,
					title: 'Sample Image 1',
					description: '',
					filename: 'Sample1.jpg',
					views: 0,
					likes: 0,
					timestamp: Date.now
				},{
					uniqueId: 2,
					title: 'Sample Image 2',
					description: '',
					filename: 'Sample2.jpg',
					views: 0,
					likes: 0,
					timestamp: Date.now
				},{
					uniqueId: 3,
					title: 'Sample Image 3',
					description: '',
					filename: 'Sample3.jpg',
					views: 0,
					likes: 0,
					timestamp: Date.now
				},{
					uniqueId: 4,
					title: 'Sample Image 4',
					description: '',
					filename: 'Sample4.jpg',
					views: 0,
					likes: 0,
					timestamp: Date.now
				}
			]
		};

		// res.render('index',viewModel);
		sidebar(viewModel, function(viewModel){
			res.render('index', viewModel);
		});
	}
};

