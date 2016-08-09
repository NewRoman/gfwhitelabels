define(function() {
    return {
        login: Backbone.View.extend({
            events: {
                'submit .login-form': 'login',
            },

            initialize: function(options) {
                this.login_fields = options.login_fields;
                this.register_fields = options.register_fields;
            },

            render: function() {
                this.$el.html(
                    window.userLogin({
                        login_fields: this.login_fields,
                        register_fields: this.register_fields
                    })
                );
                return this;
            },

            login: function(event) {
                event.preventDefault();
                var form = $(event.target);
                app.showLoading();
                this.$('form > .alert-warning').html('');
                var data = form.serializeObject();

                $.ajax({
                    url: serverUrl + Urls['rest_login'](),
                    method: 'POST',
                    data: data,
                    success: (xhr) => {
                        defaultSaveActions.success(this, xhr);
                        if(xhr.hasOwnProperty('key')) {
                            localStorage.setItem('token', xhr.key);
                            setTimeout(function() {
                                window.location = '/' //data.next ? data.next : '/account/profile'
                            }, 200);
                        } else {
                            Backbone.Validation.callbacks.invalid(                                 
                              form, '', 'Server return no authentication data'
                            );
                        }
                    },
                    error: (xhr, status, text) => {
                        defaultSaveActions.error(this, xhr, status, text);
                    }
                });
            },
        }),

        signup: Backbone.View.extend({
            initialize: function(options) {
                this.template = options.template;
            },

            render: function() {
                this.$el.append(
                    _.template(this.template)({
                        serverUrl: serverUrl,
                    })
                );
                return this;
            },
        }),

        profile: Backbone.View.extend({
            initialize: function(options) {
                this.fields = options.fields
            },

            events: {
                'submit form': 'update',
            },

            update: function(event) {
                event.preventDefault();
                let data = $(event.target).serializeObject();

                this.model.set(data);
                if(this.model.isValid(true)) {
                    this.model.save({}, {
                        success: (model, response, status) => {
                            defaultSaveActions.success(this, response);
                        },
                        error: (model, response, status) => {
                            defaultSaveActions.error(this, response);
                        }
                    });
                }
            },

            render: function() {
                requirejs(['/js/dropzone.js',], (dropzone) => {
                    this.$el.html(
                        window.userProfile({
                            serverUrl: serverUrl,
                            user: app.user.toJSON(),
                            fields: this.fields
                        })
                    );
                    //createFileDropzone('image', 'avatars', '', function() { console.log('hello'); });
                    return this;
                });
            },
        }),
    
    }
});
