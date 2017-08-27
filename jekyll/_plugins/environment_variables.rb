module Jekyll

  class EnvironmentVariablesGenerator < Generator
    priority :lowest

    ENV_PREFIX = 'JKL__'

    def generate(site)
      # Override settings with values from environment
      ENV.keys.select{ |k| k.start_with?(ENV_PREFIX)}.each do |envvar|
        site.config[envvar.sub(/^#{ENV_PREFIX}/, '')] = ENV[envvar]
      end
    end
  end

end
