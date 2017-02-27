'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var snake_case = require('snake-case');
var yosay = require('yosay');
var github_user = require('shelljs-github-user');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var self = this;
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the exceptional ' + chalk.red('generator-gulp-webpack-es-6') + ' generator!'
        ));

        // get potential default values from user's gitconfig
        // from https://github.com/yeoman/generator/issues/190
        github_user().then((github_obj) => {
            self.gitInfo = github_obj;
            _prompt_project_info();
        }).catch((reason) => {
            self.log(reason);
            _prompt_project_info(); // skip gitInfo
        });

        function _prompt_project_info() {
            var prompt_item_array = GenHelper.get_prompt_item_array(self);

            self.prompt(prompt_item_array, function(props) {
                self.props = props;
                // To access props later use self.props.someOption;
                done();
            }.bind(self));
        }
    },

    writing: function() {
        var passedOptions = {
            name: this.props.name,
            description: this.props.description,
            homepage: this.props.homepage,
            author: this.props.author,
            email: this.props.email
        }

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            passedOptions
        );

        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            passedOptions
        );

        this.fs.copy(
            this.templatePath('gulpfile.babel.js'),
            this.destinationPath('gulpfile.babel.js')
        );

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            passedOptions
        );

        this.fs.copyTpl(
            this.templatePath('webpack_dev.config.js'),
            this.destinationPath('webpack_dev.config.js'),
            passedOptions
        );

        this.fs.copy(
            this.templatePath('.eslintrc'),
            this.destinationPath('.eslintrc')
        );

        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('app/index.html'),
            this.destinationPath('app/index.html'),
            passedOptions
        );

        this.fs.copy(
            this.templatePath('app/scripts/mymodule.js'),
            this.destinationPath('app/scripts/' + this.props.name + '.js')
        );

        this.fs.copy(
            this.templatePath('app/scripts/helper_module.js'),
            this.destinationPath('app/scripts/helper_module.js')
        );

        this.fs.copy(
            this.templatePath('app/styles/mymodule.css'),
            this.destinationPath('app/styles/' + this.props.name + '.css')
        );
    },

    install: function() {
        this.installDependencies();
    }
});

class GenHelper {
    static get_prompt_item_array(caller_obj) {
        var prompt_item_array = [{
                type: 'input',
                name: 'name',
                message: 'The module name (e.g., main or circle)',
                default: snake_case(prompt_for_template_name_key.appname)
            }, {

                type: 'input',
                name: 'description',
                message: 'A description of your project',
                default: ''
            },
            {
                type: 'input',
                name: 'homepage',
                message: 'The home page of the project',
                default: ''
            },
            {
                type: 'input',
                name: 'author',
                message: "Author's name",
                default: prompt_for_template_name_key.gitInfo.name
            },
            {
                type: 'input',
                name: 'email',
                message: "Author's email",
                default: prompt_for_template_name_key.gitInfo.email
            }
        ];

        return prompt_item_array;
    }
}
