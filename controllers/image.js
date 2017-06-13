var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');

module.exports ={
	index: function(req, res){
		var viewModel= {
			image: {
				uniqueId: 1,
				title: 'Sample Image 1',
				description: 'This is a sample.',
				filename: 'sample1.jpg',
				views: 0,
				likes: 0,
				timestample: Date.now()
			},
			
			comments: [
				{
					image_id: 1,
					email: 'test@testing.com', 
					name: 'Test Tester',
					gravatar: 'http://lorempixel.com/75/75/animals/1',
					comment: 'This is s test comment...',
					timestamp: Date.now()
				},{
					image_id: 1,
					email: 'test@testing.com', 
					name: 'Anomymous Tester',
					gravatar: 'http://lorempixel.com/75/75/animals/2',
					comment: 'Another following comment.',
					timestamp: Date.now()
				}
			]
		};
		sidebar(viewModel,function(viewModel){		
			res.render('image',viewModel);
		});

	},
	create: function(req,res){

		console.log('req.files: ');
		console.log(req.files);

		var tempfiles = req.files.pop();

		var tempPath = tempfiles.path;


		var orgName = tempfiles.originalname;
		
		var saveImage = function () {
			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
			var imgUrl = '';
		
			for ( var i = 0 ; i < 6 ; i+=1 ){
				imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			// var tempPath = req.files.file.path;
			//var tempPath = req.files.pop().path;

			var ext = path.extname( orgName ).toLowerCase();

			console.log(' ext : ' + ext);

			var targetPath = path.resolve('./public/upload/' + imgUrl + ext );

			console.log(' tempPath: ' + tempPath);
			console.log(' targetPath: ' + targetPath);
			console.log(' imgUrl: ' + imgUrl);
			
			if( ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ) {
				fs.rename(tempPath, targetPath, function(err) {
					if(err) throw err;
					res.redirect('/images/' + imgUrl);
				});
			} else {
				fs.unlink(tempPath, function() {
					if (err) throw err;

					res.json(500, {error: 'Only image files are allowed.'});
				});
			}
		};

		saveImage();
	},
	like: function(req,res){
		res.send('The image:like POST controller');
	},
	comment: function(req,res){
		res.send('The image:comment POST controller');
	}
}; 
