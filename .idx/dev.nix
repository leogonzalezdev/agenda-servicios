{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
    pkgs.python3
  ];
  idx = {
    extensions = [
      "ritwickdey.LiveServer"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npx" "serve" "-l" "$PORT" "."];
          manager = "web";
        };
      };
    };
  };
}
