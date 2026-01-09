{ pkgs, ... }:

{
  # Pinned package versions for reproducibility
  # Update these versions when upgrading dependencies

  languages.javascript = {
    enable = true;
    bun = {
      enable = true;
      # Pin to exact version used in development
      # Update this when upgrading bun locally
      package = pkgs.bun;  # Uses nixpkgs version (1.1.x in nixos-24.05)
    };
  };

  # Node.js for tooling compatibility
  languages.typescript.enable = true;

  packages = with pkgs; [
    # Core development tools
    nodejs_20          # Node.js 20 LTS
    git

    # Playwright dependencies (for CI)
    playwright-driver.browsers

    # Build tools
    biome
  ];

  # Environment variables
  env = {
    # Playwright browser path for nix
    PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
  };

  # Pre-commit hooks for code quality
  pre-commit.hooks = {
    biome = {
      enable = true;
      entry = "bunx biome check --write";
      pass_filenames = false;
    };
    typecheck = {
      enable = true;
      entry = "bun run typecheck";
      pass_filenames = false;
    };
  };

  # Scripts available in the shell
  scripts = {
    dev.exec = "bun run dev";
    build.exec = "bun run build";
    lint.exec = "bun run lint";
    check.exec = "bun run check";
    test.exec = "bun run test";
  };

  enterShell = ''
    echo "🎰 Next Casino Development Environment"
    echo "======================================"
    echo "Node: $(node --version)"
    echo "Bun: $(bun --version)"
    echo ""
    echo "Available commands:"
    echo "  dev    - Start development server"
    echo "  build  - Build for production"
    echo "  lint   - Run linter"
    echo "  check  - Lint + typecheck"
    echo "  test   - Run tests"
    echo ""
  '';
}
